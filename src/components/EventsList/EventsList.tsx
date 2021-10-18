import React from 'react'
import { AllEventType } from '../../types';

import { ColonyInitialised, ColonyRoleSet, DomainAdded, PayoutClaimed } from './Events'
import styles from './EventsList.module.css';


interface EventListsProp {
  eventList: AllEventType[]
}

const EventsList: React.FC<EventListsProp> = ({ eventList }) => {
  
  return (
    <div className={styles.Container}>
      
      <div className={styles.Eventlist}>
      
      {
        eventList && 
        eventList.map((event, key) => 
          
        <div key={key}>
          
          {event.parsedLog.name === 'ColonyInitialised' && <ColonyInitialised colonyInitialized={event} /> }
          {event.parsedLog.name === 'ColonyRoleSet' && <ColonyRoleSet colonyRoleSet={event} /> }
          {event.parsedLog.name === 'DomainAdded' && <DomainAdded domainAdded={event} /> }
          {event.parsedLog.name === 'PayoutClaimed' && <PayoutClaimed payoutClaimed={event} /> }
        </div>
        )
      }
      
      </div>
    </div>
  )
}

export default EventsList
