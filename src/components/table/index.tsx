import React, { useState, useEffect } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { ITicker } from './interface';
import { LogoImage, PriceImage, intialValue, pairsToFilter } from '@/constant';
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { COLOR } from '@/constant/color';
import ItemRow from '../itemRow';

const ContainerTable = () => {
  const [tickerData, setTickerData] = useState<ITicker[]>([]);
  const [rowETHUSDT, setrowETHUSDT] = useState<{
    current: ITicker;
    previous: ITicker;
  }>({
    current: intialValue[0],
    previous: intialValue[0],
  });
  const [rowMATICUSDT, setRowMATICUSDT] = useState<{
    current: ITicker;
    previous: ITicker;
  }>({
    current: intialValue[1],
    previous: intialValue[1],
  });
  const [rowXRPUSDC, setrowXRPUSDC] = useState<{
    current: ITicker;
    previous: ITicker;
  }>({
    current: intialValue[2],
    previous: intialValue[2],
  });
  const [rowBTCUSDT, setrowBTCUSDT] = useState<{
    current: ITicker;
    previous: ITicker;
  }>({
    current: intialValue[3],
    previous: intialValue[3],
  });
  const [rowSOLUSDC, setrowSOLUSDC] = useState<{
    current: ITicker;
    previous: ITicker;
  }>({
    current: intialValue[4],
    previous: intialValue[4],
  });
  const [rowBTCUSDC, setrowBTCUSDC] = useState<{
    current: ITicker;
    previous: ITicker;
  }>({
    current: intialValue[5],
    previous: intialValue[5],
  });
  const [rowETHUSDC, setrowETHUSDC] = useState<{
    current: ITicker;
    previous: ITicker;
  }>({
    current: intialValue[6],
    previous: intialValue[6],
  });
  const [rowETHBTC, setrowETHBTC] = useState<{
    current: ITicker;
    previous: ITicker;
  }>({
    current: intialValue[7],
    previous: intialValue[7],
  });

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
            s: item.s,
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

  useEffect(() => {
    tickerData.forEach((item) => {
      switch (item.s) {
        case 'ETHUSDC':
          setrowETHUSDC((prevState) => ({
            current: item,
            previous: prevState.current,
          }));
          break;
        case 'BTCUSDT':
          setrowBTCUSDT((prevState) => ({
            current: item,
            previous: prevState.current,
          }));
          break;
        case 'ETHUSDT':
          setrowETHUSDT((prevState) => ({
            current: item,
            previous: prevState.current,
          }));
          break;
        case 'SOLUSDC':
          setrowSOLUSDC((prevState) => ({
            current: item,
            previous: prevState.current,
          }));
          break;
        case 'ETHBTC':
          setrowETHBTC((prevState) => ({
            current: item,
            previous: prevState.current,
          }));
          break;
        case 'XRPUSDC':
          setrowXRPUSDC((prevState) => ({
            current: item,
            previous: prevState.current,
          }));
          break;
        case 'MATICUSDT':
          setRowMATICUSDT((prevState) => ({
            current: item,
            previous: prevState.current,
          }));
          break;
        case 'BTCUSDC':
          setrowBTCUSDC((prevState) => ({
            current: item,
            previous: prevState.current,
          }));
          break;
        default:
          break;
      }
    });
  }, [tickerData]);

  return (
    <div
      style={{
        margin: '32px',
      }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        spacing={2}
        mb={2}
      >
        <Typography fontWeight={600} fontSize={'26px'}>
          Next JS Interview Test
        </Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        spacing={2}
        mb={2}
      >
        <Typography fontWeight={400} fontSize={'16px'}>
          Nguyen Thanh Vien - 0914730992 - thanhviennguyen01@gmail.com
        </Typography>
      </Stack>
      <TableContainer
        sx={{
          '& .MuiTableCell-body': {
            borderBottom: 'none',
          },
          backgroundColor: COLOR.captionDisable1,
        }}
      >
        <Table>
          <TableHead
            sx={{
              whiteSpace: 'nowrap',
              color: COLOR.captionDisable,
            }}
          >
            <TableRow>
              <TableCell align={'left'}>
                <Typography fontSize="20px" color={'black'} fontWeight={500}>
                  Pair
                </Typography>
              </TableCell>
              <TableCell align={'right'}>
                <Typography fontSize="20px" color={'black'} fontWeight={500}>
                  Price
                </Typography>
              </TableCell>
              <TableCell align={'right'}>
                <Typography fontSize="20px" color={'black'} fontWeight={500}>
                  24h Change
                </Typography>
              </TableCell>
              <TableCell align={'right'}>
                <Typography fontSize="20px" color={'black'} fontWeight={500}>
                  24h Volume (Coin)
                </Typography>
              </TableCell>
              <TableCell align={'right'}>
                <Typography fontSize="20px" color={'black'} fontWeight={500}>
                  24h Volume USD
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              '&.MuiTableCell-root': {
                padding: 0,
              },
            }}
          >
            <ItemRow
              item={rowETHUSDT}
              imagePair={LogoImage.ETHUSDT}
              imagePrice={PriceImage.ETHUSDT}
            />
            <ItemRow
              item={rowMATICUSDT}
              imagePair={LogoImage.MATICUSDT}
              imagePrice={PriceImage.MATICUSDT}
            />
            <ItemRow
              item={rowXRPUSDC}
              imagePair={LogoImage.XRPUSDC}
              imagePrice={PriceImage.XRPUSDC}
            />
            <ItemRow
              item={rowBTCUSDT}
              imagePair={LogoImage.BTCUSDT}
              imagePrice={PriceImage.BTCUSDT}
            />
            <ItemRow
              item={rowSOLUSDC}
              imagePair={LogoImage.SOLUSDC}
              imagePrice={PriceImage.SOLUSDC}
            />
            <ItemRow
              item={rowBTCUSDC}
              imagePair={LogoImage.BTCUSDC}
              imagePrice={PriceImage.BTCUSDC}
            />
            <ItemRow
              item={rowETHUSDC}
              imagePair={LogoImage.ETHUSDC}
              imagePrice={PriceImage.ETHUSDC}
            />
            <ItemRow
              item={rowETHBTC}
              imagePair={LogoImage.ETHBTC}
              imagePrice={PriceImage.ETHBTC}
            />
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ContainerTable;
