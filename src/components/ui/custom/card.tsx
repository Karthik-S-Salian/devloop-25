interface TeamCardProps {
  name: string;
  image: string;
}
const TeamCard = ({ name, image }: TeamCardProps) => {
  return (
    <div className="border-1 flex h-[400px] w-[270px] flex-col items-center gap-4 rounded-2xl border border-yellow-600 px-3 py-4 shadow-lg shadow-yellow-300">
      <div className="w-full">
        <img
          src={image}
          alt={name}
          className="h-[250px] max-h-[250px] w-full rounded-xl"
        />
      </div>
      <h1 className="font-fira-code text-2xl capitalize">{name}</h1>
    </div>
  );
};
export default TeamCard;
