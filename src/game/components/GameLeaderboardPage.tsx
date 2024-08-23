import { Typography, Stack } from '@mui/material';
import { FaMedal, FaEquals } from 'react-icons/fa';
import { SiFireship } from 'react-icons/si';
import { MdAcUnit } from 'react-icons/md';
import { ReactNode, useMemo } from 'react';
import { ScoresProps } from '../GameInterfaces';
import useBackHome from '../../hooks/useBackHome';

const GameLeaderboardPage = () => {
  const scores = useBackHome<{ scores: ScoresProps }>()?.scores ?? [];

  const sortedScores = useMemo(
    () => scores.sort((a, b) => b.score - a.score),
    [scores]
  );

  return (
    <>
      <Typography variant="h3">Leaderboard</Typography>
      <div style={{ gap: '0.5rem', display: 'grid', padding: '1rem' }}>
        {sortedScores.map((player, index) => (
          <div
            key={index}
            style={{ display: 'grid', gridTemplateColumns: '5% 95%', gap: 10, alignItems : 'center' }}
          >
            {index < 3 ? (
              <FaMedal
                color={
                  index === 0 ? 'gold' : index === 1 ? 'silver' : '#d98100'
                }
                style={{ width: '100%', height: '100%' }}
              />
            ) : (
              <div></div>
            )}
            <div
              style={{
                alignItems : 'center',
                display: 'flex',
                flexDirection: 'row',
                border: '1px solid',
                borderRadius: 5,
                padding: '15px',
                justifyContent: 'space-between',
              }}
            >
              <Typography>{player.userName}</Typography>
              <Stack sx={{alignItems : 'center'}} direction="row"> 
                <GainedScoreView  score={player.gainedScore}/>
                 <Typography sx={{marginLeft : '1rem'}}>{player.score}</Typography>
                {/* To-Do: Add functionality for streak */}
              </Stack>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const GainedScoreView = ({score} : {score : number}) => {

const props : {icon : ReactNode, color : string, prefixText? : string} = 
  score === 0 ? {
      color : 'black',
      icon : <FaEquals style={{color : 'black', width: '0.75rem', height: '0.75rem'}}/>
  } : score > 0 ? {
    color : 'green',
    icon : <SiFireship style={{ color: 'orangered', width: '1rem', height: '1rem' }}/>,
    prefixText : '+'
  } : {
    color : 'red',
    icon : <MdAcUnit style={{ color: 'lightblue', width: '1rem', height: '1rem' }}/>,
    prefixText : '-'
  }
 

return (
  <div style={{display:'flex', alignItems : 'center'}}>
  <Typography color={props.color}>{`${props.prefixText ?? ''} ${score}`}</Typography>
  {props.icon}
  </div>
)
}

export default GameLeaderboardPage;
