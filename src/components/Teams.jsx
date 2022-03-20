import React, { useEffect, useState } from 'react';
import SectionTitle from './SectionTitle';
import SingleMember from './single/SingleMember';
import { TEAM, TeamAPI } from '../api/Localhost';
import Spinner from './bootstrap/Spinner';
import Alert from './bootstrap/Alert';

function TeamMembers() {
  const [teams, setTeams] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get_team_member_api();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const get_team_member_api = () => {
    TeamAPI.get('/')
      .then((response) => {
        setTeams(response.data);
      })
      .catch((error) => {
        setTeams(TEAM);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const TeamMemberList = () => {
    if (teams && teams.length > 0) {
      let team_member = teams.map((member) => (
        <SingleMember key={member.id} member={member} />
      ));
      return <> {team_member} </>;
    } else {
      return <Alert> no team member available </Alert>;
    }
  };

  const Render = () => {
    if (loading) {
      return <Spinner />;
    }
    if (teams) {
      return <TeamMemberList />;
    } else {
      return <Alert> no team member available </Alert>;
    }
  };

  return (
    <>
      <section className='my-5'>
        <SectionTitle title='our amazing team' subtitle="what's up" />
        <div className='container my-5'>
          <div className='row justify-content-center align-items-center'>
            <Render />
          </div>
        </div>
      </section>
    </>
  );
}

export default TeamMembers;
