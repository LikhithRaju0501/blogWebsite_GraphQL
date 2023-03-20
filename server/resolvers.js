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
        userId: isUser.id,
        date,
      });
    },
    updateBlog: async (_, { input }, { user }) => {
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
        date: today,
      });
    },

    deleteBlog: async (_, { id }, { user }) => {
      const isBlogUser = await Blog.findById(id);
      rejectIf(!isBlogUser || user.id !== isBlogUser.userId);
      return Blog.delete(id);
    },
    signUpUser: (_, { input }) => User.create(input),
  },
  Blog: {
    user: async ({ userId }) => {
      const userDetails = await User.findById(userId);
      if (!userDetails) unauthError();
      return userDetails;
    },
  },
};
