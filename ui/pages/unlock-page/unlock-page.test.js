import React from 'react';
import configureMockStore from 'redux-mock-store';
import { fireEvent } from '@testing-library/react';
import thunk from 'redux-thunk';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { renderWithProvider } from '../../../test/lib/render-helpers';
import UnlockPage from '.';

const mockTryUnlockMetamask = jest.fn(() => async () => Promise.resolve());
const mockMarkPasswordForgotten = jest.fn();

jest.mock('../../store/actions.ts', () => ({
  ...jest.requireActual('../../store/actions.ts'),
  tryUnlockMetamask: () => mockTryUnlockMetamask,
  markPasswordForgotten: () => mockMarkPasswordForgotten,
}));

const mockElement = document.createElement('svg');

jest.mock('@glenlapp/logo', () => () => ({
  container: mockElement,
  setFollowMouse: jest.fn(),
  stopAnimation: jest.fn(),
  lookAt: jest.fn(),
  lookAtAndRender: jest.fn(),
}));

describe('Unlock Page', () => {
  process.env.METAMASK_BUILD_TYPE = 'main';

  const middlewares = [thunk];
  
  it('should match snapshot', () => {
    const store = configureMockStore(middlewares)({ glenlapp: {} });
    const { container } = renderWithProvider(<UnlockPage />, store);
    expect(container).toMatchSnapshot();
  });

  it('changes password and submits', async () => {
    const props = { onSubmit: jest.fn() };
    const store = configureMockStore(middlewares)({ glenlapp: {} });
    const { queryByTestId } = renderWithProvider(<UnlockPage {...props} />, store);

    const passwordField = queryByTestId('unlock-password');
    const loginButton = queryByTestId('unlock-submit');

    expect(passwordField).toBeInTheDocument();
    expect(passwordField).toHaveAttribute('type', 'password');
    expect(passwordField.nodeName).toBe('INPUT');
    
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();

    fireEvent.change(passwordField, { target: { value: 'a-password' } });
    
    expect(loginButton).toBeEnabled();

    fireEvent.click(loginButton);

    expect(props.onSubmit).toHaveBeenCalled();
  });

  it('clicks imports seed button', () => {
      const store = configureMockStore(middlewares)({ glenlapp: {} });
      const { getByText, getByTestId }=renderWithProvider(<UnlockPage />,store);

      fireEvent.click(getByText("Forgot password?"));

      const resetPasswordButton=getByTestId("reset-password-modal-button");

      expect(resetPasswordButton).toBeInTheDocument();

      fireEvent.click(resetPasswordButton);

      expect(mockMarkPasswordForgotten).toHaveBeenCalled();
   });

   it("should redirect to history location when unlocked", ()=>{
     const intendedPath='/previous-route'
     const store=configureMockStore(middlewares)({
       glenlapp:{isUnlocked:true}
     })
     let history=createMemoryHistory({
       initialEntries:[
         {
           pathname:"/unlock",
           state:{from:{pathname:intendedPath}}
         }
       ]
     })
     
     jest.spyOn(history,"push")
     
     renderWithProvider(
       <Router history={history}>
         <UnlockPage/>
       </Router>,store)
       
       expect(history.push).toHaveBeenCalledTimes(1)
       
       expect(history.push).toHaveBeenCalledWith(intendedPath)
       
       expect(history.location.pathname===intendedPath)
   })

   it("changes password, submits, and redirects to the specified route",async()=>{
   
   let intendedPath='/intended-route'
   
   let intendedSearch='?abc=123'

   let store=configureMockStore(middlewares)({glenlapp:{isUnlocked:false}})

   let history=createMemoryHistory({

        initialEntries:[{
          pathname:'/unlock',
          state:{
            from:{
              pathname:intendedPath,
              search:intendedSearch
            }
          }
        }]
      
})

jest.spyOn(history,'push')

let{queryByTestId}=renderWithProvider(
<Router history={history}>
<UnlockPage />
</Router>,store)

let passwordField=queryByTestId("unlock-password")

let loginButton=queryByTestId("unlock-submit")

fireEvent.change(passwordField,{target:{value:'a-password'}})

fireEvent.click(loginButton)

await Promise.resolve()

expect(mockTryUnlockMetamask).toHaveBeenCalledTimes(1)

expect(history.push).toHaveBeenCalledTimes(1)

expect(history.push ).toHaveBeenCalledWith(intendedPath+intendedSearch )

expect(history.location.pathname ).toBe(intendedPath )

expect(history.location.search ).ToBe(intendedSearch )
})
});
