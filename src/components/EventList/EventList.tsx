import React from 'react'
import { AllEventType } from '../../types';

import { ColonyInitialised, ColonyRoleSet, DomainAdded, PayoutClaimed } from './Events'

interface EventListProp {
  eventList: AllEventType[]
}

const EventList: React.FC<EventListProp> = ({ eventList }) => {
  
  return (
    <div>
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

{/* ColonyRoleSet */}
{/* DomainAdded */}
{/* ColonyInitialised */}
{/* PayoutClaimed */}


    </div>
  )
}

export default EventList
