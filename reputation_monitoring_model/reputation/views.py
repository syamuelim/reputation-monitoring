from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *
from .RequestSerializers import *
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from datetime import datetime
import pandas as pd
import numpy as np
import json
from langdetect import detect
import re
from cleantext import clean
import emoji
import torch 
import transformers
from torch.utils.data import Dataset, DataLoader
from torch.utils.data import Dataset, DataLoader, RandomSampler, SequentialSampler
from transformers import BertTokenizer, BertModel, BertConfig
from transformers import AutoTokenizer, AutoModelForSequenceClassification

@swagger_auto_schema(
    method='post',
    request_body=ReputationCreateRequestSerializer
)
@api_view(['POST'])
def category(request):
    kol_id = request.data.get('kolId')
    youtube_response_id = request.data.get('youtubeResponseId')
    youtube_channel_id = request.data.get('youtubeChannelId')
    # get the youtube comments data json
    # remarks: 
    #   1. the json data can be retrieved by youtube_response_serializer.data.get('response')
    #   2. the record fetch time can be retrieved by youtube_response_serializer.data.get('created_at')
    #   3. the json data is stringified, you may need to parse the data before use
    youtube_response = YoutubeResponse.objects.get(pk = youtube_response_id)
    youtube_response_serializer = YoutubeResponseSerializer(youtube_response)

    # get youtube channel
    youtube_channel = YoutubeChannel.objects.get(pk = youtube_channel_id)
    youtube_channel_serializer = YoutubeChannelSerializer(youtube_channel).data
    youtube_channel_name = youtube_channel_serializer.get('channel_name')
    
    # TODO generate the reputation
    device = 'cpu'
    # cpu is enought, no need gpu(just for training)
    json_data = youtube_response_serializer.data.get('response')
    preprocessed_comment_df = preprocess_data(json_data)

    # load dataloader (contain toknizer and helps load in data to model)
    dataset = CustomDataset_Cat(preprocessed_comment_df, 200)
    VALID_BATCH_SIZE = 8
    data_params = {'batch_size': VALID_BATCH_SIZE,
                'shuffle': False,
                'num_workers': 0
                }
    data_loader = DataLoader(dataset, **data_params)

    # load model
    model_cat = BERT_Category_Model()
    model_cat.load_state_dict(torch.load('reputation/category_model.pth', map_location=torch.device('cpu')))
    
    # model generate output
    outputs_probability = model_gen_prob_output(model_cat, data_loader, device)
    # outputs_label : [0,0,0,1,0] ... 
    outputs_label= (outputs_probability == np.max(outputs_probability, axis=1, keepdims=True))
    catergory_list = ['Engagement to content', 'Opinion & Inquiry', 'Spam', 'Appreciation', 'Dissatisfaction' ]
    output_catergory = []
    for output in outputs_label:
        categories = [catergory_list[i] for i, val in enumerate(output) if val == 1]
        output_catergory.extend(categories)
    
    # combine proprocessed_comment_df(comments, author) and output_catergory
    preprocessed_comment_df['Predicted_Category'] = output_catergory
    
    # preprocessed_comment_df is ready
    # with [Comments] [Author] [predicted_catergoru]

    reputation_score = 5
    # save the reputation data to db
    reputation_result = Reputation.objects.create( kol_id=kol_id, rating = reputation_score, status ="ACTIVE", reputation_at= datetime.now(), created_at= datetime.now())
    reputation_result.save()
    return Response(status=status.HTTP_201_CREATED)


@swagger_auto_schema(
    method='post',
    request_body=ReputationCreateRequestSerializer
)
@api_view(['POST'])
def sentiment(request):
    kol_id = request.data.get('kolId')
    youtube_response_id = request.data.get('youtubeResponseId')
    youtube_channel_id = request.data.get('youtubeChannelId')
    
    # get the youtube comments data json
    # remarks: 
    #   1. the json data can be retrieved by youtube_response_serializer.data.get('response')
    #   2. the record fetch time can be retrieved by youtube_response_serializer.data.get('createdAt')
    #   3. the json data is stringified, you may need to parse the data before use
    youtube_response = YoutubeResponse.objects.get(pk = youtube_response_id)
    youtube_response_serializer = YoutubeResponseSerializer(youtube_response)
    
    # get youtube channel
    youtube_channel = YoutubeChannel.objects.get(pk = youtube_channel_id)
    youtube_channel_serializer = YoutubeChannelSerializer(youtube_channel).data
    youtube_channel_name = youtube_channel_serializer.get('channel_name')
    
    # TODO generate the reputation
    device = 'cpu'
    json_data = youtube_response_serializer.data.get('response')
    preprocessed_comment_df = preprocess_data(json_data)

    # load tokenizer and model
    tokenizer = AutoTokenizer.from_pretrained('nlptown/bert-base-multilingual-uncased-sentiment')
    model_sentiment = AutoModelForSequenceClassification.from_pretrained('nlptown/bert-base-multilingual-uncased-sentiment')
    # tokenize it
    comments = preprocessed_comment_df["Comment"].tolist()
    encoded_inputs = tokenizer.batch_encode_plus(comments, padding=True, truncation=True, return_tensors='pt')
    input_ids = encoded_inputs['input_ids']
    attention_masks = encoded_inputs['attention_mask']
    sentiment_results = []

    # batch size = 10
    num_batch = len(comments) //10
    if len(comments) %10 !=0 :
        num_batch +=1
    for i in range(num_batch) :
        start = i*10
        end = min(i*10+10, len(comments))
        input_id = input_ids[start: end]
        attention_mask = attention_masks[start: end]
        model_prob_results = model_sentiment(input_id, attention_mask=attention_mask)
        predicted_labels = torch.argmax(model_prob_results.logits, dim=1).tolist()
        index_result_5_levels = predicted_labels
        index_result_3_levels = [0 if num in [0, 1] else 1 if num == 2 else 2 for num in index_result_5_levels]
        sentiment_result = ["Negative" if num in [0] else "Neutral" if num == 1 else "Positive" for num in index_result_3_levels]
        sentiment_results.extend(sentiment_result)

    preprocessed_comment_df['Predicted_Sentiment'] = sentiment_results

    # preprocessed_comment_df is ready

    reputation_score = 5
    # save the reputation data to db
    reputation_result = Reputation.objects.create( kol_id=kol_id, rating = reputation_score, status ="ACTIVE", reputation_at= datetime.now(), created_at= datetime.now())
    reputation_result.save()
    return Response(status=status.HTTP_201_CREATED)


@swagger_auto_schema(
    method='post',
    request_body=ReputationCreateRequestSerializer
)
@api_view(['POST'])
def channel(request):
    kol_id = request.data.get('kolId')
    youtube_response_id = request.data.get('youtubeResponseId')
    youtube_channel_id = request.data.get('youtubeChannelId')
    
    # get the youtube comments data json
    # remarks: 
    #   1. the json data can be retrieved by youtube_response_serializer.data.get('response')
    #   2. the record fetch time can be retrieved by youtube_response_serializer.data.get('createdAt')
    #   3. the json data is stringified, you may need to parse the data before use
    youtube_response = YoutubeResponse.objects.get(pk = youtube_response_id)
    youtube_response_serializer = YoutubeResponseSerializer(youtube_response)
    
    # get youtube channel
    youtube_channel = YoutubeChannel.objects.get(pk = youtube_channel_id)
    youtube_channel_serializer = YoutubeChannelSerializer(youtube_channel).data
    youtube_channel_name = youtube_channel_serializer.get('channel_name')
    
    # TODO generate the reputation
    device = 'cpu'
    json_data = youtube_response_serializer.data.get('response')
    preprocessed_comment_df = preprocess_data(json_data)

    # load dataloader (contain toknizer and helps load in data to model)
    dataset = CustomDataset_Cat(preprocessed_comment_df, 200)
    VALID_BATCH_SIZE = 8
    data_params = {'batch_size': VALID_BATCH_SIZE,
                'shuffle': False,
                'num_workers': 0
                }
    data_loader = DataLoader(dataset, **data_params)

    # load model
    model_asso = BERT_Association_Model()
    model_asso.load_state_dict(torch.load('reputation/association_model.pth', map_location=torch.device('cpu')))
    
    # model generate output
    outputs_probability = model_gen_prob_output(model_asso, data_loader, device)
    # outputs_label : [0,0,0,1,0] ... 
    outputs_label= (outputs_probability == np.max(outputs_probability, axis=1, keepdims=True))
    catergory_list = ['Not Associated' , 'Associated']
    output_catergory = []
    for output in outputs_label:
        categories = [catergory_list[i] for i, val in enumerate(output) if val == 1]
        output_catergory.extend(categories)
    
    # combine proprocessed_comment_df(comments, author) and output_catergory
    preprocessed_comment_df['Predicted_Association'] = output_catergory

    # preprocessed_comment_df is ready
    
    reputation_score = 5
    # save the reputation data to db
    reputation_result = Reputation.objects.create( kol_id=kol_id, rating = reputation_score, status ="ACTIVE", reputation_at= datetime.now(), created_at= datetime.now())
    reputation_result.save()
    return Response(status=status.HTTP_201_CREATED)


#####################################################################################################################
##############################################     ADDED FUNCTIONS     ##############################################
#####################################################################################################################

# get output from model
def model_gen_prob_output(model, data_loader, device):
    model.eval()
    fin_outputs=[]
    with torch.no_grad():
        for _, data in enumerate(data_loader, 0):
            ids = data['ids'].to(device, dtype = torch.long)
            mask = data['mask'].to(device, dtype = torch.long)
            token_type_ids = data['token_type_ids'].to(device, dtype = torch.long)
            outputs = model(ids, mask, token_type_ids)
            fin_outputs.extend(torch.sigmoid(outputs).cpu().detach().numpy().tolist())
    return fin_outputs

# Catergory models
class BERT_Category_Model(torch.nn.Module):
    def __init__(self):
        super().__init__()
        self.l1 = transformers.BertModel.from_pretrained('bert-base-uncased')
        self.l2 = torch.nn.Dropout(0.1)
        self.l3 = torch.nn.Linear(768, 5)

    def forward(self, ids, mask, token_type_ids):
        _, output_1 = self.l1(ids, attention_mask=mask, token_type_ids=token_type_ids, return_dict=False)
        output_2 = self.l2(output_1)
        output = self.l3(output_2)
        return output
    
# Association model 
class BERT_Association_Model(torch.nn.Module) :
    def __init__(self) :
        super().__init__()
        # import bert base
        self.l1 = transformers.BertModel.from_pretrained('bert-base-uncased')
        self.l2 = torch.nn.Dropout(0.1)
        # binaray classification
        # output two probability seems more informational
        self.l3 = torch.nn.Linear(768, 2)

    def forward(self, ids, mask, token_type_ids) :
        # l1 returns last layer hidden stat, pooled output
        _, output_1= self.l1(ids, attention_mask = mask, token_type_ids = token_type_ids, return_dict = False)
        output_2 = self.l2(output_1)
        output = self.l3(output_2)
        return output

# dataset class for handling tokenization and passing comment to model
class CustomDataset_Cat(Dataset) :
    def __init__(self, dataframe,  max_len) :
        self.tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
        self.data = dataframe
        self.comment_text = dataframe.Comment
        self.max_len = max_len

    def __len__(self):
        return len(self.comment_text)

    def __getitem__(self, index):
        comment_text = str(self.comment_text[index])
        comment_text = " ".join(comment_text.split())

        inputs = self.tokenizer.encode_plus(
            comment_text, None, add_special_tokens=True, max_length=self.max_len,
            pad_to_max_length=True, return_token_type_ids=True
        )
        ids = inputs['input_ids']
        mask = inputs['attention_mask']
        token_type_ids = inputs["token_type_ids"]

        return {
            'ids': torch.tensor(ids, dtype=torch.long),
            'mask': torch.tensor(mask, dtype=torch.long),
            'token_type_ids': torch.tensor(token_type_ids, dtype=torch.long),
        }


# preprocess the data and comment to ready for the model's analysis
def preprocess_data(json_file): 
    df = preprocess_json_file(json_file)
    # remove non english ones
    df['is_english'] = df['Comment'].apply(check_english)
    df = df[df['is_english'] == True].copy()
    df.drop(columns = 'is_english', inplace = True)
    # remove spaces
    df['Comment'] = df['Comment'].str.strip()
    # remove empty rows
    df = df.dropna(subset=['Comment'])
    df = df[df["Comment"] != '']
    df = df.reset_index(drop=True)
    # handle symbol and html entiteis
    df = handle_entities(df)   
    # handle the links
    df = handle_links(df)
    # remove emojis
    remove_or_convert = True
    df = handle_emojis(df, remove_or_convert)
    return df

def preprocess_json_file(json_data):
    # json.loads for read json data and convert into a Python object
    data = json.loads(json_data)
    comments = []
    authors = []
    get_replies_to_comment = False
    for item in data['items']:
        top_comment_item = item['snippet']
        top_comment = top_comment_item['topLevelComment']['snippet']['textDisplay']
        top_author = top_comment_item['topLevelComment']['snippet']['authorDisplayName']
        comments.append(top_comment)
        authors.append(top_author)

        # these are the replies to the top comment
        if ('replies' in item) & get_replies_to_comment : 
            reply_comment_item = item['replies']
            
            # in Item[replies][comments]
            for reply_comment in reply_comment_item['comments']: 
                comment = reply_comment['snippet']['textOriginal']
                author = reply_comment['snippet']['textOriginal']
                comments.append(comment)
                authors.append(author)

    comment_df = pd.DataFrame({'Comment': comments, 'Author': authors})
    comment_df['Comment'] = comment_df['Comment'].str.replace('\r', ' ')
    return comment_df

def check_english(text) :
    try:
        lang = detect(text)
        return lang == 'en'
    except:
        return False
    
def handle_entities(df) :
    df['Comment'] = df['Comment'].apply(lambda x: x.replace("&#39;", "'"))
    # double quotation mark
    df['Comment'] = df['Comment'].apply(lambda x: x.replace("&quot;", '"'))
    # > <
    df['Comment'] = df['Comment'].apply(lambda x: x.replace("&gt;", '>'))
    df['Comment'] = df['Comment'].apply(lambda x: x.replace("&lt;", '<'))
    # -
    df['Comment'] = df['Comment'].apply(lambda x: x.replace("&ndash;", '-'))
    df['Comment'] = df['Comment'].apply(lambda x: x.replace("&mdash;", '—'))
    return df

def handle_links(df) :
    ## 1. Link to timestamp
    pattern = r'<a href="https://www\.youtube\.com/watch\?v=[^"]+&amp;t=\d+">(.+)</a>'
    # extract the timestamp and replace the link with "Timestamp of this video"
    def extract_timestamp(comment):
        pattern = r'<a href="https://www\.youtube\.com/watch\?v=([^"]+)&amp;t=(\d+)">([^<]+)</a>'
        matches = re.findall(pattern, comment)
        if matches:
            for match in matches:
                video_id = match[0]
                timestamp_link = match[1]
                timestamp = match[2]
                comment = comment.replace(f'<a href="https://www.youtube.com/watch?v={video_id}&amp;t={timestamp_link}">{timestamp}</a>', 'Timestamp of video ' + timestamp)
        return comment

    def handle_zero_timestamp(comment):
        #pattern 1 = 00:00
        pattern1 = r'<a href="https://www\.youtube\.com/watch\?v=([^"]+)">00:00</a>'
        matches = re.findall(pattern1, comment)
        if matches:
            for match in matches:
                video_id = match
                comment = comment.replace(f'<a href="https://www.youtube.com/watch?v={video_id}">00:00</a>', 'Timestamp of video 00:00')
        # pattern 2 = 0:00
        pattern2 = r'<a href="https://www\.youtube\.com/watch\?v=([^"]+)">0:00</a>'
        matches = re.findall(pattern2, comment)
        if matches:
            for match in matches:
                video_id = match
                comment = comment.replace(f'<a href="https://www.youtube.com/watch?v={video_id}">0:00</a>', 'Timestamp of video 0:00')
        return comment

    # Apply the transformation to all rows
    df['Comment'] = df['Comment'].apply(extract_timestamp)
    df['Comment'] = df['Comment'].apply(handle_zero_timestamp)

    ## 2. Link to video
    pattern = r'<a href="https://www\.youtube\.com/watch\?v=[^"]+">(.+)</a>'

    # extract the timestamp and replace the link with "Link to video"
    def extract_videolink(comment):
        match = re.search(pattern, str(comment))
        if match:
            comment = comment.replace(match.group(0), 'Link to video')
        return comment

    df['Comment'] = df['Comment'].apply(extract_videolink)

    ## 3. search query
    pattern = r'<a href="http://www.youtube.com/results\?search_query=%23(\w+)">(.+?)</a>'
    def extract_search_query(comment):
        matches = re.findall(pattern, str(comment))
        if matches:
            for match in matches :
                link = match[0]
                word_part = match[1]
                comment = comment.replace(f'<a href="http://www.youtube.com/results?search_query=%23{link}">{word_part}</a>', word_part)
        return comment
    df['Comment'] = df['Comment'].apply(extract_search_query)

    # done
    return df

def handle_emojis(df, remove_or_convert):
    def remove_emojis(text):
        return clean (text, no_emoji = True)
    def convert_emoji_to_text(text) :
        return emoji.demojize(text)
    
    # True = remove
    if remove_or_convert: 
        df["Comment"] = df["Comment"].apply(remove_emojis)
    else :
        df["Comment"] = df["Comment"].apply(convert_emoji_to_text)
    return df
