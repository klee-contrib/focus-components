import React from 'react';

// Components

import Button from '../button';
import Dropdown from '../dropdown'

const HeaderActions = ({primary, secondary}) =>  {
      return (
          <div data-focus='content-actions'>
              {primary.map((primary) => {
                  if(Array.isArray(primary.action)) {
                      return <Dropdown iconProps={{name: primary.icon}} operationList={primary.action} shape='fab'/>;
                  } else {
                      return (
                          <Button key={primary.label} handleOnClick={primary.action} icon={primary.icon} label={primary.label} shape='fab' style={{className: primary.className}} type='button'/>
                      );
                  }
              })}
              { secondary && <Dropdown iconProps={{name: 'more_vert'}} operations={secondary} shape='fab'/>}
          </div>
      );
};


export default HeaderActions;
