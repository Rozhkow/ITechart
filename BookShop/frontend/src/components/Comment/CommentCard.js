import React, { useState, useContext, useRef } from "react";
import { useMutation } from "@apollo/client";
import { Card, Form, Container } from "semantic-ui-react";
import moment from "moment";

import "./CommentCard.css";

import { AuthContext } from "../../context/auth";
import DeleteButton from "../DeleteButton";

import { DELETE_COMMENT } from "../../util/graphql";
import { SUBMIT_COMMENT } from "../../util/graphql";

function CommentCard({ comments, id }) {
  const { user } = useContext(AuthContext);

  const commentInputRef = useRef(null);
  const [comment, setComment] = useState("");

  const [deleteComment] = useMutation(DELETE_COMMENT);

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

  return (
    <Container className="CommentContainer">
      <h1 className="Comments">Comments:</h1>
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
          <Card.Content className="CardContainer">
            <Card.Header>{comment.username}</Card.Header>
            <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
            <Card.Description>{comment.body}</Card.Description>
            <hr />
            {user && (user.username === comment.username || user.admin) && (
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
  );
}

export default CommentCard;
