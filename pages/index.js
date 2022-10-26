import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Account from "../components/Account";
import { useState, useEffect } from "react";

const Home = () => {
  const [title, setTitle] = useState();
  const [genre, setGenre] = useState();
  const [description, setDescription] = useState();

  const session = useSession();
  const supabase = useSupabaseClient();

  useEffect(() => {}, [title, genre, description]);

  const handleChange = (e) => {
    //console.log(e.target.id);
    switch (e.target.id) {
      case "title-input":
        setTitle(e.target.value);
        break;
      case "genre-input":
        setGenre(e.target.value);
        break;
      case "desc-input":
        setDescription(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(title, genre, description, session.user.id);
    const { error } = await supabase.from("tester").insert({
      title: title,
      genre: genre,
      description: description,
      author: session.user.id,
    });
  };

  return (
    <>
      <div className="container" style={{ padding: "50px 0 100px 0" }}>
        {!session ? (
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="dark"
            providers={["google"]}
            magicLink
          />
        ) : (
          <Account session={session} />
        )}

        <div>
          {session && (
            <>
              <div>
                <h1>Submit a Film</h1>
              </div>
              <form action="">
                <input
                  type="text"
                  placeholder="title"
                  id="title-input"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="genre "
                  id="genre-input"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="description"
                  id="desc-input"
                  onChange={handleChange}
                />
                <button onClick={handleClick}>Submit</button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
