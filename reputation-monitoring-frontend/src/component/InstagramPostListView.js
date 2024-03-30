import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Box from "@mui/material/Box";
import Container from "@mui/material/Box";
import Grid from "@mui/system/Unstable_Grid";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Pagination from "@mui/material/Pagination";

import * as instagramService from "../service/InstagramService";
import noImg from "/assets/no_image.png";

const InstagramPostListView = ({ instagramUserId }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(6);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadInstagramPostById(instagramUserId, page, itemPerPage);
  }, []);

  useEffect(() => {
    loadInstagramPostById(instagramUserId, page, itemPerPage);
  }, [page]);

  let loadInstagramPostById = async (instagramUserId) => {
    // find reputation data
    const instagramPostResponse = await instagramService.getInstagramPostPyId(
      instagramUserId,
      page,
      itemPerPage
    );
    const instagramPostCountResponse =
      await instagramService.getInstagramPostCountById(instagramUserId);
    setPosts(instagramPostResponse.data);
    setTotal(Math.ceil(instagramPostCountResponse.data / itemPerPage));
  };

  let pageSelected = (event, page) => {
    setPage(page - 1);
  };

  return (
    <SafeAreaView>
      <Box
        sx={{ width: "100%", bgcolor: "background.paper" }}
        border={"1px solid #c6c6c6"}
        borderRadius={"8px"}
      >
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Grid
            container
            columnSpacing={1}
            sx={{ justifyContent: "spaceBetween", margin: "0 4px 0 4px" }}
          >
            {(posts.length === 0 ? Array.from(new Array(3)) : posts).map(
              (post, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 210,
                    marginRight: 0.5,
                    marginTop: 0.5,
                  }}
                >
                  {post ? (
                    post.mediaUrl ? (
                      post.mediaUrl.includes("mp4") ? (
                        <video
                          autoPlay
                          controls
                          style={{
                            display: "block",
                            objectFit: "cover",
                            width: "212px",
                            height: "207.5px",
                            aspectRatio: "1/1",
                            borderRadius: "8px",
                            border: "1px solid #c6c6c6",
                          }}
                        >
                          <source src={post.mediaUrl} type="video/mp4"></source>
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <img
                          style={{
                            display: "block",
                            objectFit: "cover",
                            width: "100%",
                            height: "74%",
                            aspectRatio: "1/1",
                            borderRadius: "8px",
                            border: "1px solid #c6c6c6",
                          }}
                          src={post.mediaUrl}
                          alt="Cannot display video"
                        />
                      )
                    ) : (
                      <img
                        style={{
                          display: "block",
                          objectFit: "cover",
                          width: "100%",
                          height: "74%",
                          aspectRatio: "1/1",
                          borderRadius: "8px",
                          border: "1px solid #c6c6c6",
                        }}
                        src={noImg}
                      />
                    )
                  ) : (
                    <Skeleton variant="rectangular" width={210} height={118} />
                  )}
                  {post ? (
                    <Box sx={{ pr: 2 }}>
                      <Typography
                        color={"#7B7B7B"}
                        gutterBottom
                        variant="body2"
                        align="justify"
                        noWrap={true}
                      >
                        {post.content}
                      </Typography>
                      <Typography
                        display="block"
                        variant="caption"
                        color="text.secondary"
                      >
                        {`likes: ${post.likes} comments: ${post.commentsCount}`}
                      </Typography>
                      <Typography variant="caption">
                        {` ${new Date(post.createdAt).toLocaleDateString(
                          "en-GB",
                          { day: "2-digit", month: "2-digit", year: "numeric" }
                        )}`}
                      </Typography>
                    </Box>
                  ) : (
                    <Box sx={{ pt: 0.5 }}>
                      <Skeleton />
                      <Skeleton width="60%" />
                    </Box>
                  )}
                </Box>
              )
            )}
          </Grid>
          {total != 0 ? (
            <Pagination
              count={total}
              size="small"
              onChange={pageSelected}
              sx={{ alignSelf: "center" }}
            />
          ) : (
            ""
          )}
        </Container>
      </Box>
    </SafeAreaView>
  );
};

export default InstagramPostListView;
