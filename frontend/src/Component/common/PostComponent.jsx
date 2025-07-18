// import React from "react";
import {
  FaHeart,
  FaRegBookmark,
  FaRegComment,
  FaRegHeart,
  FaTrash,
} from "react-icons/fa";
import LoadingSpinner from "./LoadingSpinner";
import { Link } from "react-router-dom";
import { BiRepost } from "react-icons/bi";

const PostComponent = ({
  post,
  postOwner,
  formattedDate,
  isMyPost,
  isDeleting,
  handleDeletePost,
  handlePostComment,
  isCommenting,
  comment,
  handleRepost,
  isReposting,
  handleLikePost,
  isLiking,
  authUser,
  setComment,
  formatPostDate,
  handleLikeComment,
  isCommentLiking,
}) => {
  const isLiked = post.likes.includes(authUser?._id);
  return (
    <>
      <div className="flex gap-2 items-start p-4 border-b border-gray-700">
        <div className="avatar">
          <Link
            to={`/profile/${postOwner?.username}`}
            className="w-8 rounded-full overflow-hidden"
          >
            <img src={postOwner?.profilePicture || "/avatar-placeholder.png"} />
          </Link>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-2 items-center">
            <Link to={`/profile/${postOwner?.username}`} className="font-bold">
              {postOwner?.fullName}
            </Link>
            <span className="text-gray-700 flex gap-1 text-sm">
              <Link to={`/profile/${postOwner?.username}`}>
                @{postOwner?.username}
              </Link>
              <span>·</span>
              <span>{formattedDate}</span>
            </span>
            {isMyPost && (
              <span className="flex justify-end flex-1">
                {!isDeleting && (
                  <FaTrash
                    className="cursor-pointer hover:text-red-500"
                    onClick={handleDeletePost}
                  />
                )}

                {isDeleting && <LoadingSpinner size="sm" />}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-3 overflow-hidden">
            <span>{post?.caption}</span>
            {post.image && (
              <img
                src={post.image}
                className="h-80 object-contain rounded-lg border border-gray-700"
                alt=""
              />
            )}
          </div>
          <div className="flex justify-between mt-3">
            <div className="flex gap-4 items-center w-2/3 justify-between">
              <div
                className="flex gap-1 items-center cursor-pointer group"
                onClick={() =>
                  document
                    .getElementById("comments_modal" + post._id)
                    .showModal()
                }
              >
                <FaRegComment className="w-4 h-4  text-slate-500 group-hover:text-sky-400" />
                <span className="text-sm text-slate-500 group-hover:text-sky-400">
                  {post.comments.length}
                </span>
              </div>
              {/* We're using Modal Component from DaisyUI */}
              <dialog
                id={`comments_modal${post._id}`}
                className="modal border-none outline-none"
              >
                <div className="modal-box rounded border border-gray-600">
                  <h3 className="font-bold text-lg mb-4">COMMENTS</h3>
                  <div className="flex flex-col gap-3 max-h-60 overflow-auto">
                    {post.comments.length === 0 && (
                      <p className="text-sm text-slate-500">
                        No comments yet 🤔 Be the first one 😉
                      </p>
                    )}
                    {post.comments.map((comment) => (
                      <div key={comment._id} className="flex gap-2 items-start">
                        <div className="avatar">
                          <div className="w-8 rounded-full">
                            <img
                              src={
                                comment.user?.profilePicture ||
                                "/avatar-placeholder.png"
                              }
                            />
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1">
                            <span className="font-bold">
                              {comment.user?.fullName}
                            </span>
                            <span className="text-gray-700 text-sm">
                              @{comment.user?.username}
                            </span>
                          </div>
                          <div className="text-sm text-white">
                            {comment?.comment}
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <button
                              onClick={() => handleLikeComment(comment._id)}
                              className="text-xs flex items-center gap-1 text-gray-500 hover:text-red-500"
                              disabled={isCommentLiking}
                            >
                              {isCommentLiking ? (
                                <LoadingSpinner size="xs" />
                              ) : comment.likes?.includes(authUser?._id) ? (
                                <FaHeart className="text-red-500" />
                              ) : (
                                <FaRegHeart />
                              )}
                              {comment.likes?.length || 0}
                            </button>
                          </div>
                          <span className="text-xs text-gray-500">
                            {formatPostDate(comment.createdAt)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <form
                    className="flex gap-2 items-center mt-4 border-t border-gray-600 pt-2"
                    onSubmit={handlePostComment}
                  >
                    <textarea
                      className="textarea w-full p-1 rounded text-md resize-none border focus:outline-none  border-gray-800"
                      placeholder="Add a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <button className="btn btn-primary rounded-full btn-sm text-white px-4">
                      {isCommenting ? <LoadingSpinner size="md" /> : "Post"}
                    </button>
                  </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button className="outline-none">close</button>
                </form>
              </dialog>
              <div
                className="flex gap-1 items-center group cursor-pointer"
                onClick={handleRepost}
              >
                {isReposting && <LoadingSpinner size="sm" />}
                {!isReposting && (
                  <BiRepost
                    className={`w-6 h-6 ${
                      post.reposts.includes(
                        authUser?._id || post.repostedBy?._id === authUser?._id
                      )
                        ? "text-slate-500 fill-green-500"
                        : "text-slate-500 group-hover:text-green-500"
                    } 
                      `}
                  />
                )}
                <span
                  className={`text-sm ${
                    post.reposts.includes(authUser?._id)
                      ? "text-slate-500"
                      : "text-slate-500 group-hover:text-green-500"
                  } `}
                >
                  {post.reposts.length}
                </span>
              </div>
              <div
                className="flex gap-1 items-center group cursor-pointer"
                onClick={handleLikePost}
              >
                {isLiking && <LoadingSpinner size="sm" />}
                {!isLiking && (
                  <FaRegHeart
                    className={`w-6 h-6 ${
                      isLiked
                        ? "text-pink-500 fill-pink-500"
                        : "text-slate-500 group-hover:text-pink-500"
                    }`}
                  />
                )}

                <span
                  className={`text-sm  group-hover:text-pink-500 ${
                    isLiked ? "text-pink-500" : "text-slate-500"
                  }`}
                >
                  {post.likes.length}
                </span>
              </div>
            </div>
            <div className="flex w-1/3 justify-end gap-2 items-center">
              <FaRegBookmark className="w-4 h-4 text-slate-500 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostComponent;
