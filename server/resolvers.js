import { Blog, User } from "./db.js";

function rejectIf(condition) {
  if (condition) throw new Error("Unauthorized");
}
const unauthError = () => {
  throw new Error("Unauthorized");
};

export const resolvers = {
  Query: {
    greeting: (_, { id }) => "Hello World",
    blogs: () => Blog.findAll(),
    blog: (_, { id }) => Blog.findById(id),
    isUsersBlog: async (_, blog, { user }) => {
      const { userId } = await Blog.findById(blog.id);
      return userId === user.id;
    },
  },
  Mutation: {
    createBlog: async (_, { input }, { user }) => {
      const { id } = user;
      const isUser = await User.findById(id);
      rejectIf(!isUser);
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();
      const date = `${dd}/${mm}/${yyyy}`;
      today = dd + "/" + mm + "/" + yyyy;

      return Blog.create({
        ...input,
        author: isUser.name,
        userId: isUser.id,
        date,
        comments: [],
      });
    },
    updateBlog: async (_, { input }, { user }) => {
      rejectIf(!user);
      const blogUser = await Blog.findById(input.id);
      const isUserExist = await User.findById(user.id);
      rejectIf(blogUser.userId !== isUserExist.id);
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();

      today = dd + "/" + mm + "/" + yyyy;
      return Blog.update({
        ...input,
        userId: isUserExist.id,
        author: isUserExist.name,
        date: today,
      });
    },

    deleteBlog: async (_, { id }, { user }) => {
      const isBlogUser = await Blog.findById(id);
      rejectIf(!isBlogUser || user.id !== isBlogUser.userId);
      return Blog.delete(id);
    },
    signUpUser: (_, { input }) => User.create(input),
    addComment: async (_, { input }, { user }) => {
      const blogToComment = await Blog.findById(input?.id);
      const userToComment = await User.findById(user?.id);
      rejectIf(!userToComment || !blogToComment);
      if (blogToComment.userId === userToComment.id)
        throw new Error("You cannot comment on your own post");
      return Blog.update({
        ...blogToComment,
        comments: [
          ...blogToComment.comments,
          { id: user.id, message: input.message, author: user.name },
        ],
      });
    },
  },
  Blog: {
    user: async ({ userId }) => {
      const userDetails = await User.findById(userId);
      if (!userDetails) unauthError();
      return userDetails;
    },
    author: async ({ userId }) => {
      const userDetails = await User.findById(userId);
      if (!userDetails) unauthError();
      return userDetails.name;
    },
  },
};
