import { Link } from "react-router-dom";
const genres = [
  {
    name: "Rock Music",
    img: "/img/rock.jpeg",
  },
  {
    name: "Electronic Music",
    img: "/img/electronic.png",
  },
  {
    name: "Coke Studio Pakistan",
    img: "/img/coke_studio_pakistan.jpg",
  },
  {
    name: "Rap Music",
    img: "/img/rap.jpg",
  },
  {
    name: "Pop Music",
    img: "/img/pop.jpg",
  },
  {
    name: "Classical Music",
    img: "/img/classical.png",
  },
];

function Songs() {
  return (
    <div id="songs" className="w-full">
      <p className="p-2 md:text-xl pb-8 text-center">
        Search for a song or explore one of the following genres.
      </p>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
        {genres.map(({ name, img }) => {
          return (
            <Link
              to={"/search?q=" + name}
              key={name + img}
              className="group flex flex-col gap-4 bg-bg-dark rounded-sm text-left transition-all focus-within:scale-110 hover:scale-110 rouned-md overflow-hidden relative max-h-[250px]"
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover brightness-50 group-hover:brightness-95 group-focus-within:brightness-95"
              />
              <h3 className="w-full text-xl md:text-2xl text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {name}
              </h3>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Songs;
