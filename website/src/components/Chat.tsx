import { GiCancel } from "react-icons/gi";
import { RxAvatar } from "react-icons/rx";

export default function Chat({ setChatActive }: any): JSX.Element {
  return (
    <section className="fixed top-28 left-4 md:left-1/4 w-11/12 md:w-1/2 h-3/4 bg-purple-300 rounded-2xl shadow-xl opacity-90 backdrop-brightness-50 flex flex-col items-center">
      <div className="flex flex-row w-full h-12 mt-4 justify-center items-center border-b-2 shadow-lg">
        <p className="mr-auto ml-auto pl-8 font-bold text-2xl tracking-wide">
          Chat
        </p>
        <button
          className="flex justify-center items-center scale-150 mr-8 mb-1 text-red-600 hover:text-red-400"
          onClick={() => setChatActive(false)}
        >
          <GiCancel />
        </button>
      </div>
      <section className="flex flex-col w-full mt-4 overflow-y-hidden">
        <div className="flex flex-row items-center justify-evenly">
          <RxAvatar className="scale-150" />
          <div className="w-10/12 h-8 rounded-lg bg-white"></div>
        </div>
      </section>
    </section>
  );
}
