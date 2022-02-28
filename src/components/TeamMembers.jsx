import React, { useContext, useEffect, useState } from 'react';
import SectionTitle from './SectionTitle';
import SingleMember from './SingleMember';
import { TEAM_MEMBER, TeamMemberAPI } from '../api/Localhost';
import IsJsonServerDown from '../context/IsJsonServerDown';

function TeamMembers() {
  const is_jsonServer_down = useContext(IsJsonServerDown);
  const [teamMember, setTeamMember] = useState(TEAM_MEMBER);

  useEffect(() => {
    if (is_jsonServer_down) {
      setTeamMember(TEAM_MEMBER);
    } else {
      get_team_member_api();
    }
  }, []);

  const get_team_member_api = () => {
    TeamMemberAPI.get('/')
      .then((response) => {
        setTeamMember(response.data);
      })
      .catch((error) => {
        setTeamMember(TEAM_MEMBER);
      });
  };

  const team_member_list = () => {
    if (teamMember.length > 0) {
      return teamMember.map((member) => {
        return <SingleMember key={member.id} member={member} />;
      });
    } else {
      return <> no team member available </>;
    }
  };
  return (
    <>
      <section className='my-5'>
        <SectionTitle title='our amazing team' subtitle="what's up" />
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
