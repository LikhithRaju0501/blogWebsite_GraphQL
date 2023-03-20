import { Database } from "fakebase";

const db = new Database("./data");

export const Blog = db.table("blogs");
export const User = db.table("users");
