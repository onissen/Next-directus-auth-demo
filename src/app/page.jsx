import { auth } from "@/lib/auth";
import directus from "@/lib/directus";
import { readItems, withToken } from "@directus/sdk";

async function getData() {
  const session = await auth()
  if (session) {
    return await directus.request(withToken(session.user.accessToken,readItems("global")))
  }
}

const HomePage = async () => {
  // const session = await auth()
  // console.log(session)
  const data = await getData()
  if (data) {
    return (
      <div>
       <h1>{data.title}</h1> 
       <p>{data.description}</p>
      </div>
    );
  }
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  )
};

export default HomePage;
