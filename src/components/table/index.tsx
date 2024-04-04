import React, { useState, useEffect } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { ITicker } from './interface';
import { pairsToFilter } from '@/constant';
import { Table, TableProps } from 'antd';

interface DataType {
  key: string;
  c: string;
  p: string;
  P: string;
  v: string;
  q: string;
}

const TableContainer = () => {
  const [tickerData, setTickerData] = useState<DataType[]>([]);
  const [tableData, setTableData] = useState<DataType[]>([]);

  useEffect(() => {
    const client = new W3CWebSocket(
      'wss://fstream.binance.com/stream?streams=!ticker@arr'
    );

    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };

    client.onmessage = (message) => {
      const ticker = JSON.parse(message.data as string);
      setTickerData(
        ticker.data
          .filter((ticker: ITicker) => pairsToFilter.includes(ticker.s))
          .map((item: ITicker) => ({
            key: item.s,
            c: item.c,
            p: item.p,
            P: item.P,
            q: item.q,
            v: item.v,
          }))
      );
    };

    client.onerror = (error) => {
      console.error('Connection Error:', error);
    };

    client.onclose = () => {
      console.log('WebSocket Client Closed');
    };

    return () => {
      client.close();
    };
  }, []);

  //   useEffect(() => {
  //     // const newKeyNewData = tickerData.map((item) => item.s);

  //     // const oldData = tableData.filter(
  //     //   (ticker: ITicker) => !newKeyNewData.includes(ticker.s)
  //     // );

  //     // setTableData([...oldData, ...tickerData]);

  //     setTableData((prevTableData) => {
  //       const updatedData = [...prevTableData];
  //       tickerData.forEach((newTicker) => {
  //         const index = updatedData.findIndex(
  //           (oldTicker) => oldTicker.key === newTicker.key
  //         );
  //         if (index !== -1) {
  //           updatedData[index] = newTicker;
  //         } else {
  //           updatedData.push(newTicker);
  //         }
  //       });
  //       return updatedData;
  //     });
  //   }, [tickerData]);

  useEffect(() => {
    setTableData((prevTableData) => {
      const updatedData = [...prevTableData];
      tickerData.forEach((newTicker) => {
        const index = updatedData.findIndex(
          (oldTicker) => oldTicker.key === newTicker.key
        );
        if (index !== -1) {
          const oldTicker = updatedData[index];
          if (
            oldTicker.c !== newTicker.c ||
            oldTicker.P !== newTicker.P ||
            oldTicker.v !== newTicker.v ||
            oldTicker.q !== newTicker.q
          ) {
            updatedData[index] = newTicker;
          }
        } else {
          updatedData.push(newTicker);
        }
      });
      return updatedData;
    });
  }, [tickerData]);

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Pair',
      dataIndex: 'key',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Price',
      dataIndex: 'c',
      key: 'c',
      align: 'right',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '24h Change',
      dataIndex: 'P',
      key: 'P',
      align: 'right',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '24h Volume (Coin)',
      dataIndex: 'v',
      key: 'v',
      align: 'right',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '24h Volume USD',
      dataIndex: 'q',
      key: 'q',
      align: 'right',
      render: (text) => <a>{text}</a>,
    },
  ];

  return (
    <div>
      <h1>Ticker Data:</h1>
      <Table columns={columns} dataSource={tableData} />
    </div>
  );
};

export default TableContainer;
