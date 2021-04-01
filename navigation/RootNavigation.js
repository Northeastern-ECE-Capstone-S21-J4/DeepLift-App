import * as React from 'react';

//This class enables navigation without the need for react hooks
export const navigationRef = React.createRef();

export function navigate(name, params){
    navigationRef.current?.navigate(name, params);
}