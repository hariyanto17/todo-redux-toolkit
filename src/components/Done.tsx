
interface IDone {
  isDone: boolean;
  onClick: () => void;
}

const Done = ({ isDone, onClick }: IDone) => {
  return (
    <div
      onClick={onClick}
      className={`done-container ${isDone ? "done-on" : "done-off"}`}
    >
      <div
        className={`done ${
          isDone ? "done-on-background" : "done-off-background"
        }`}
      />
    </div>
  );
};

export default Done;
