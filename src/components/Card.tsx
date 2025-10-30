import { SpringValue, animated, useSpring } from "@react-spring/web";
import React from "react";
import { Task } from "../module";

interface Props {
  task: Task;
  searchLanguage: string;
  setSearchLevel: React.Dispatch<React.SetStateAction<string>>;
  setSearchLanguage: React.Dispatch<React.SetStateAction<string>>;
  setSearchRole: React.Dispatch<React.SetStateAction<string>>;
}

interface SpringProps {
  from: { y: SpringValue<number> };
  to: { y: SpringValue<number> };
}

const Card: React.FC<Props> = ({
  task,
  searchLanguage,
  setSearchLevel,
  setSearchRole,
  setSearchLanguage,
}) => {
  const springs = useSpring<SpringProps>({
    from: { y: -20 },
    to: { y: 10 },
  });

  return (
    <animated.li
      style={{
        ...springs,
      }}
      className={`bg-white lg:h-40 h-[20rem] w-auto lg:w-auto mx-6 lg:mx-12 rounded-xl my-7 flex flex-col lg:flex-row items-center lg:justify-between md:justify-center justify-center lg:px-12 px-4 shadow-lg text-xl lg:text-lg ${
        task.featured && "border-l-8 border-teal-600"
      }`}
    >
      <div className="flex lg:space-x-6 flex-col lg:flex-row items-center lg:items-start -ml-16 lg:ml-0">
        <img
          src={`${task.logo}`}
          alt={`logo ${task.company}`}
          className="w-[4rem] lg:w-28 lg:h-28 lg:-mt-0 -mt-10 md:-mt-24"
        />
        <div className="space-y-1 pt-6 lg:pt-0 flex flex-col items-start ml-14 md:ml-0">
          <div className="flex space-x-1 items-start justify-start">
            <p className="font-bold text-teal-600 md:text-xl">{task.company}</p>
            {task.new && (
              <span className="bg-teal-600 px-2 lg:rounded-xl rounded-full font-bold text-white text-sm">
                NEW!
              </span>
            )}
            {task.featured && (
              <span className="bg-black px-2 lg:rounded-xl rounded-full font-bold text-white text-sm">
                FEATURED
              </span>
            )}
          </div>
          <p className="font-bold text-xl">{task.position}</p>
          <ul className="flex justify-between text-gray-500 space-x-[0.35rem]">
            <li>{task.postedAt}</li>
            <li>·</li>
            <li>{task.contract}</li>
            <li>·</li>
            <li>{task.location}</li>
          </ul>
        </div>
      </div>

      <div className="">
        {/* Divider hidden on mobile */}
        <div className="h-[0.1rem] bg-slate-300 my-6 lg:hidden mx-3"></div>

        {/* Tags */}
        <ul>
          <li className="flex lg:space-x-2 justify-start flex-wrap lg:flex-nowrap">
            <p
              className="bg-[#eef6f6] ml-3 mb-4 lg:ml-0 lg:mb-0 flex px-2 rounded-sm font-bold text-teal-600 hover:bg-teal-600 hover:text-[#eef6f6] cursor-pointer"
              onClick={() => setSearchRole(task.role)}
            >
              {task.role}
            </p>
            <p
              className="bg-[#eef6f6] ml-3 mb-4 lg:ml-0 lg:mb-0 flex px-2 rounded-sm font-bold text-teal-600 cursor-pointer hover:bg-teal-600 hover:text-[#eef6f6]"
              onClick={() => setSearchLevel(task.level)}
            >
              {task.level}
            </p>
            {task.languages
              .filter((item) =>
                searchLanguage === "" ? item : item === searchLanguage
              )
              .map((languages) => (
                <p
                  key={languages}
                  className="bg-[#eef6f6] mb-4 ml-3 lg:ml-0 lg:mb-0 flex px-2 rounded-sm font-bold text-teal-600 cursor-pointer hover:bg-teal-600 hover:text-[#eef6f6]"
                  onClick={() => setSearchLanguage(languages)}
                >
                  {languages}
                </p>
              ))}
          </li>
        </ul>
      </div>
    </animated.li>
  );
};

export default Card;
