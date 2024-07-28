import { auth } from "@/lib/auth";
import directus from "@/lib/directus";
import { readItems, withToken } from "@directus/sdk";

async function getData() {
  const session = await auth()
  if (session) {
    console.log(session)
    return await directus.request(withToken(session.user.accessToken,readItems("global")))
  }
}

const HomePage = async () => {
  const data = await getData()
  const session = await auth()
  if (data && session) {
    return (

      <div>
       <h1>{data.title}</h1> 
       <p>{data.description}</p>
       <p>Hallo {session.user.first_name}</p>
      </div>
    );
  }
  
};

export default HomePage;
