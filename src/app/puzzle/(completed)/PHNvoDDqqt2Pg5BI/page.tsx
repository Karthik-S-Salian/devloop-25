"use client";

const Page = () => {
  return (
    <div className="flex size-full items-center justify-center">
      <div className="z-1 mx-auto grid h-full w-full max-w-screen-xl grid-cols-1 gap-4 sm:grid-cols-4 lg:grid-cols-5">
        <div className="relative h-full w-full">
          <div className="grid-card flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-2xl p-4 px-2">
            <div className="grid-card-content">
              <p className="font-bebas-neue text-xl tracking-widest sm:text-2xl sm:tracking-wide md:text-3xl md:tracking-wider lg:tracking-widest xl:text-4xl">
                2
              </p>
            </div>
          </div>
        </div>

        <div className="grid-card relative h-full w-full sm:col-start-4 sm:row-start-3 sm:row-end-5 lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-3 lg:tracking-widest">
          <div className="font-bebas-neue flex h-full w-full flex-col items-center justify-center gap-y-4 rounded-2xl p-4 text-xl tracking-widest sm:text-2xl sm:tracking-wide md:gap-y-8 md:text-3xl md:tracking-wider xl:text-4xl">
            <p className="z-[50] duration-300 ease-in-out hover:text-5xl hover:text-yellow-400">
              4
            </p>
          </div>
        </div>

        <div className="font-bebas-neue relative h-full w-full rounded-2xl px-2 text-xl tracking-widest sm:col-start-3 sm:col-end-5 sm:row-start-1 sm:row-end-1 sm:text-2xl sm:tracking-wide md:text-3xl md:tracking-wider lg:col-start-4 lg:col-end-6 lg:tracking-widest xl:text-4xl">
          <div className="grid-card flex h-full w-full items-center justify-center">
            <div className="grid-card-content">
              <p>1</p>
            </div>
          </div>
        </div>

        <div className="relative h-full w-full sm:col-start-1 sm:col-end-3 sm:row-start-2 sm:row-end-4">
          <div className="grid-card flex h-full w-full flex-col items-center justify-center rounded-2xl px-2 sm:py-2 md:py-4">
            <div className="grid-card-content">
              <h1 className="font-bebas-neue text-center text-xl font-extrabold tracking-widest sm:text-2xl sm:tracking-wide md:text-3xl md:tracking-wider lg:tracking-widest xl:text-4xl">
                2
              </h1>
              <p className="lg:text-md m-2 text-justify font-sans text-xs font-normal sm:m-4 sm:text-sm xl:text-lg">
                2
              </p>
            </div>
          </div>
        </div>

        <div className="relative h-full w-full">
          <div className="grid-card flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-2xl p-4 px-2">
            <div className="grid-card-content">
              <p className="font-bebas-neue text-xl tracking-widest sm:text-2xl sm:tracking-wide md:text-3xl md:tracking-wider lg:tracking-widest xl:text-4xl">
                0
              </p>
            </div>
          </div>
        </div>

        <div className="grid-card relative h-full w-full sm:col-start-4 sm:row-start-1 sm:row-end-2 lg:col-start-2 lg:col-end-4 lg:row-start-2 lg:row-end-4">
          <div className="font-bebas-neue flex h-full w-full flex-col items-center justify-center gap-y-4 rounded-2xl p-4 text-xl tracking-widest sm:text-2xl sm:tracking-wide md:gap-y-8 md:text-3xl md:tracking-wider xl:text-4xl">
            <p className="z-[50] duration-300 ease-in-out hover:text-5xl hover:text-yellow-400">
              0
            </p>
          </div>
        </div>

        <div className="font-bebas-neue relative h-full w-full rounded-2xl px-2 text-xl tracking-widest sm:col-start-2 sm:col-end-4 sm:row-start-3 sm:row-end-4 sm:text-2xl sm:tracking-wide md:text-3xl md:tracking-wider lg:col-start-4 lg:col-end-6 lg:tracking-widest xl:text-4xl">
          <div className="grid-card flex h-full w-full items-center justify-center">
            <div className="grid-card-content">
              <p>3</p>
            </div>
          </div>
        </div>

        <div className="relative h-full w-full sm:col-start-1 sm:col-end-3 sm:row-start-4 sm:row-end-5">
          <div className="grid-card flex h-full w-full flex-col items-center justify-center rounded-2xl px-2 sm:py-2 md:py-4">
            <div className="grid-card-content">
              <h1 className="font-bebas-neue text-center text-xl font-extrabold tracking-widest sm:text-2xl sm:tracking-wide md:text-3xl md:tracking-wider lg:tracking-widest xl:text-4xl">
                2
              </h1>
              <p className="lg:text-md m-2 text-justify font-sans text-xs font-normal sm:m-4 sm:text-sm xl:text-lg">
                4
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
