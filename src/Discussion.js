const Discussions = ({ discussions }) => {
  return (
    <section className='discussion--wrapper'>
      <ul className='discussion--container'>
        {discussions.map((discussion) => {
          return (
            <li key={discussion.node.id} className='discussion--li'>
              <div className='discussion--avatar--wrapper'>
                <img
                  src={discussion.node.author.avatarUrl}
                  alt={`avartar of ${discussion.node.author.login}`}
                />
              </div>
              <div className='discussion--content--wrapper'>
                <div className='discussion--content--category'>
                  {`${discussion.node.category.name}`}
                </div>
                <h3 className='discussion--content--title'>
                  <a href={discussion.node.url}>{discussion.node.title}</a>
                </h3>
                <div className='discussion--content--information'>
                  {`
                    ${discussion.node.author.login} /
                    ${new Date(discussion.node.createdAt).toLocaleTimeString()}
                    `}
                </div>
              </div>
              <div className='discussion--answered'>
                <p>{discussion.node.answer ? '☑' : '☒'}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Discussions;
