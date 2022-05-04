/* eslint-disable react/function-component-definition */
import type { NextPage } from 'next';
import React from 'react';
import EarningsBox from '../components/EarningsBox';
import Layout from '../components/Layout';

const Home: NextPage = () => (
  <Layout>
    {/* <h1>be insired... by money 🤑</h1> */}
    <EarningsBox />
  </Layout>
);

export default Home;
