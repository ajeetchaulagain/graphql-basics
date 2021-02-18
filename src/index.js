import { GraphQLServer } from "graphql-yoga";

// Demo user data
const users = [
  {
    id: "1",
    name: "Ajeet",
    email: "chaulagainajeet@gmail.com",
  },
  {
    id: "2",
    name: "Sabin",
    email: "chaulagainajeet@gmail.com",
  },
];

// Type Definition (schema)
const typeDefs = `
    type Query {
       users(query:String):[User!]!
       me:User!
       post:Post!
    }
    type User{
       id:ID!
       name:String!
       email:String!
       age:Int 
    }
    type Post{
      id:ID!
      title:String!
      body:String!
      published:Boolean!
    }

`;

// Resolvers - Set of functions
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (args.query) {
        console.log("args.query->true");
        return users.filter((user) => {
          return user.name.toLowerCase().includes(args.query.toLowerCase());
        });
      }
      return users;
    },
    me() {
      return {
        id: "123",
        name: "Ajeet",
        email: "ajeet@gmail.com",
      };
    },
    post() {
      return {
        id: "1212",
        title: "First Post",
        body: "Post body",
        published: true,
      };
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log("The server is up");
});
