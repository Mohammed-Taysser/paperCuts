import React from 'react';
import SectionTitle from './SectionTitle';
import SingleMember from './SingleMember';

function TeamMembers() {
  const team_member_list = () => {
    return [1, 2, 3, 4].map((member) => {
      return <SingleMember key={member.id} />;
    });
  };
  return (
    <>
      <section className='py-5 my-5'>
        <SectionTitle title='our amazing team' subtitle='info' />
        <div className='container my-5'>
          <div className='row justify-content-center align-items-center'>
            {team_member_list()}
          </div>
        </div>
      </section>
    </>
  );
}

export default TeamMembers;
