import React, { useState, useEffect } from "react";
import axios from "axios";

interface State {
  total: number;
  conversions: number;
  mostPopular: string;
}

const Stats = () => {
  const [stats, setStats] = useState<State>({
    total: 0,
    conversions: 0,
    mostPopular: ""
  });

  const { total, conversions, mostPopular } = stats;

  useEffect(() => {
    getStats();
    // eslint-disable-next-line
  }, []);

  const getStats = async () => {
    const results = await axios.get("/api/stats");

    const data = results.data;

    setStats({
      total: data.totalAmountConverted,
      conversions: data.total_conversions,
      mostPopular: data.top_dest_currency
    });
  };

  return (
    <div>
      Total converted: <strong>${total.toFixed(2)}</strong>
      <span> | </span>
      Total number of conversion requests: <strong>{conversions}</strong>
      <span> | </span>
      Most popular target currency: <strong>{mostPopular}</strong>
    </div>
  );
};

export default Stats;
