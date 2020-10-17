import React, { Component } from 'react';
import MyApp from './Testing';

const Index = () => (
      <>
      <h1>Welcome!</h1>
      <p>
      Thank you for coming.
      </p>
      <MyApp />
      </>
)

export default Index;

//react fragments allow you to not put a div over everything. you can use React.Fragment instead.
//this way react fragments don't get put on the DOM.
//shorthand is <> </>
