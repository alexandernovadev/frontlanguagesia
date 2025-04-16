export const TextLorem = ({ length = 10 }: { length: number }) => {
  return (
    <>
      {Array.from({ length }).map((_, index) => (
        <div key={index} className="p-4 border-b border-white">
          <h1 className="text-2xl">Title</h1>
          <p className="text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis quae,
            tempore, voluptas, quod quibusdam quia doloremque repudiandae
            voluptates quidem doloribus quos. Quisquam, quas doloremque.
            Quisquam, quas doloremque.
          </p>
        </div>
      ))}
    </>
  );
};
