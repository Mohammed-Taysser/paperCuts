import React, { useEffect, useState } from 'react';
import { getAllMembers } from '../../api/team.api';
import { RowOfPlaceholderCard } from '../bootstrap/Placeholder';
import SectionTitle from './SectionTitle';
import SingleMember from '../single/SingleMember';
import Alert from '../bootstrap/Alert';

function TeamMembers() {
  const [teams, setTeams] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    get_team_member_api();
  }, []);

  const get_team_member_api = () => {
    getAllMembers()
      .then((response) => {
        setTeams(response.data);
      })
      .catch(() => {
        setLoadingError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const TeamMemberList = () => {
    let team_member = teams.map((member) => (
      <SingleMember key={member._id} member={member} />
    ));
    return <> {team_member} </>;
  };

  const Render = () => {
    if (loading && !loadingError) {
      return <RowOfPlaceholderCard />;
    } else if (loadingError) {
      return <Alert> Error While Loading members </Alert>;
    } else if (teams && teams.length > 0) {
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
