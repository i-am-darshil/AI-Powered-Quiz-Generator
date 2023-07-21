const page = ({ params }) => {
  return (
    <div>
      <h1>{params.quizId}</h1>
      <h1>{params.responseId}</h1>
    </div>
  );
};

export default page;
