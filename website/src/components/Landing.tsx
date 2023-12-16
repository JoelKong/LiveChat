export default function Landing({ setChatActive }: any): JSX.Element {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-full w-full text-white">
        <p className="text-7xl font-bold tracking-wide">Live Chat</p>
        <p className="text-xl tracking-wider mt-4">
          Experimental web app with websocket, nginx, docker and jenkins
          integration
        </p>
        <button
          className="mt-8 bg-blue-300 rounded-lg w-40 h-12 text-black text-xl tracking-wide shadow-2xl hover:bg-blue-400 font-semibold"
          onClick={() => setChatActive(true)}
        >
          Enter chat
        </button>
      </div>
    </>
  );
}
