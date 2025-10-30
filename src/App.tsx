import { Task } from "./module";
import { useState } from "react";
import Card from "./components/Card";
import Filterbar from "./components/Filterbar";
import db from "./assets/db.json";

const App = () => {
  const [searchRole, setSearchRole] = useState<string>("");
  const [searchLevel, setSearchLevel] = useState<string>("");
  const [searchLanguage, setSearchLanguage] = useState<string>("");
  const data = useState(db);

  return (
    <section className="mx-auto ">
    
      <div className="bg-teal-700 lg:bg-[url('/img/bg-header-desktop.svg')] bg-[url('/img/bg-header-mobile.svg')] bg-cover bg-center h-48"></div>

      <Filterbar
        setSearchRole={setSearchRole}
        setSearchLevel={setSearchLevel}
        searchRole={searchRole}
        searchLevel={searchLevel}
        searchLanguage={searchLanguage}
        setSearchLanguage={setSearchLanguage}
      />
      {/* List to work */}
      <ul className="lg:max-w-6xl flex flex-col mt-12  pb-12 px-0 lg:px-12 mx-auto ">
        {data[0].articles
          ?.filter((item: Task) =>
            searchRole === "" ? item.role : item.role === searchRole
          )
          .filter((item: Task) =>
            searchLevel === "" ? item.level : item.level === searchLevel
          )
          .filter((item: Task) =>
            searchLanguage === ""
              ? item.languages
              : item.languages[item.languages.indexOf(searchLanguage)]
          )
          .map((task: Task) => (
            <Card
              task={task}
              searchLanguage={searchLanguage}
              setSearchLevel={setSearchLevel}
              setSearchLanguage={setSearchLanguage}
              setSearchRole={setSearchRole}
              key={task.id}
            />
          ))}
      </ul>
    </section>
  );
};

export default App;
