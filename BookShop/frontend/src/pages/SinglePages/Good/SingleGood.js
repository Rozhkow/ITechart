import React, { useState, useContext, useRef } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Card, Grid, Image, Form, Container } from "semantic-ui-react";
import moment from "moment";

import { AuthContext } from "../../../context/auth";
import DeleteButton from "../../../components/DeleteButton";
import UpdateGood from "../../../components/Good/UpdateGood";

import "./SingleGood.css";

import { FETCH_GOOD_QUERY } from "../../../util/graphql";
import { FETCH_ITEMS_QUERY } from "../../../util/graphql";
import { DELETE_GOOD_MUTATION } from "../../../util/graphql";
import { DELETE_COMMENT } from "../../../util/graphql";
import { SUBMIT_COMMENT } from "../../../util/graphql";

function SingleGood(props) {
  const id = props.match.params.id;
  const { user } = useContext(AuthContext);

  const commentInputRef = useRef(null);
  const [comment, setComment] = useState("");

  const { data } = useQuery(FETCH_GOOD_QUERY, {
    variables: {
      id,
    },
  });

  const [deleteEvent] = useMutation(DELETE_GOOD_MUTATION, {
    update(proxy, result) {
      // TODO: remove users from cache
      const data = proxy.readQuery({
        query: FETCH_ITEMS_QUERY,
      });
      let newData = [...data.events];
      newData = [result.data.events, ...newData];
      proxy.writeQuery({
        query: FETCH_ITEMS_QUERY,
        data: {
          ...data,
          events: {
            newData,
          },
        },
      });
      props.history.push("/");
    },
    variables: { id: id },
  });

  const [deleteComment] = useMutation(DELETE_COMMENT, {
    update(proxy) {
      // TODO: remove users from cache
      const data = proxy.readQuery({
        query: FETCH_GOOD_QUERY,
      });
      return data;
    },
  });

  const [submitComment] = useMutation(SUBMIT_COMMENT, {
    update() {
      setComment("");
      commentInputRef.current.blur();
    },
    variables: {
      id: id,
      body: comment,
    },
  });

  console.log(data);
  console.log(id);

  if (!data) {
    <p>Loading good..</p>;
  } else {
    const {
      title,
      description,
      price,
      id,
      autor,
      pageNumber,
      publishYear,
      comments,
    } = data.getEvent;

    return (
      <>
        <Grid className="SingleGood">
          <Grid.Column className="img" width={5}>
            <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
          </Grid.Column>
          <Grid.Column width={6}>
            <Card fluid>
              <Card.Content className="Data">
                <Card.Header>
                  <h1>{title}</h1>
                </Card.Header>
                <Card.Description>Description: {description}</Card.Description>
                <Card.Description>Autor: {autor}</Card.Description>
                <Card.Description>
                  Number of page: {pageNumber}
                </Card.Description>
                <Card.Description>
                  Year of publishing: {publishYear}
                </Card.Description>
                <Card.Description>id: {id}</Card.Description>
                <hr />
                <Card.Content>{price}$</Card.Content>
              </Card.Content>
              <hr />
              <Card.Content extra>
                {user && user.admin === true ? (
                  <DeleteButton onConfirm={deleteEvent} />
                ) : null}
              </Card.Content>
            </Card>
          </Grid.Column>

          {user && user.admin === true ? (
            <Grid.Column width={5}>
              <UpdateGood
                id={id}
                title={title}
                description={description}
                price={price}
                autor={autor}
                pageNumber={pageNumber}
                publishYear={publishYear}
              />
            </Grid.Column>
          ) : (
            <div style={{ display: "none" }} />
          )}
        </Grid>
        <Container
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            width: "50%",
            margin: "20px",
          }}
        >
          <h1>Comments:</h1>
          {user ? (
            <Card fluid>
              <Card.Content>
                <p>Post a comment:</p>
                <Form>
                  <div className="ui action input fluid">
                    <input
                      type="text"
                      placeholder="Comment.."
                      name="comment"
                      value={comment}
                      onChange={(event) => setComment(event.target.value)}
                      ref={commentInputRef}
                    />
                    <button
                      type="submit"
                      className="ui button teal"
                      disabled={comment.trim() === ""}
                      onClick={submitComment}
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              </Card.Content>
            </Card>
          ) : (
            <Card className="unAuthMessage">
              <h1>If you wanna stay your comment, you need to register.</h1>
            </Card>
          )}
          {comments.map((comment) => (
            <Card fluid key={comment.id}>
              <Card.Content>
                <Card.Header>{comment.username}</Card.Header>
                <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                <Card.Description>{comment.body}</Card.Description>
                <hr />
                {user &&
                  (user.username === comment.username ||
                    user.admin === true) && (
                    <DeleteButton
                      onConfirm={() => {
                        deleteComment({
                          variables: { id: id, commentId: comment.id },
                        });
                      }}
                    />
                  )}
              </Card.Content>
            </Card>
          ))}
        </Container>
      </>
    );
  }
  return SingleGood;
}

export default SingleGood;
