import React, { useState, useEffect } from 'react';
import { Stack, TableCell, TableRow, Typography } from '@mui/material';
import { COLOR } from '@/constant/color';
import { ITicker } from '../table/interface';
import { formatNumberWithTwoDecimals } from '@/utils/common';

interface Props {
  item: {
    current: ITicker;
    previous: ITicker;
  };
  imagePair: string;
  imagePrice: string;
}

const ItemRow = ({ item, imagePair, imagePrice }: Props) => {
  const [highlighted, setHighlighted] = useState(false);

  useEffect(() => {
    if (item.current !== item.previous) {
      setHighlighted(true);
      const timeout = setTimeout(() => {
        setHighlighted(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [item]);

  return (
    <TableRow
      sx={{
        bgcolor: highlighted ? COLOR.bg : 'white',
        position: 'relative',
        whiteSpace: 'nowrap',
        '&.MuiTableCell-body': {
          padding: 0,
        },
      }}
    >
      <TableCell
        align={'left'}
        sx={{
          '&.MuiTableCell-body': {
            paddingLeft: 2,
          },
        }}
      >
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={1}
        >
          <img
            style={{
              height: '30px',
              width: '30px',
              color: '#000',
            }}
            alt="123"
            src={imagePair}
          />
          <Typography variant="subtitle1" fontWeight={600}>
            {item.current?.s}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell
        align={'right'}
        sx={{
          '&.MuiTableCell-body': {
            padding: 0,
          },
        }}
      >
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={1}
        >
          <img
            style={{
              height: '20px',
              width: '20px',
              color: '#000',
              fontWeight: 800,
            }}
            alt="123"
            src={imagePrice}
          />
          <Typography variant="subtitle1">{item.current?.c}</Typography>
        </Stack>
      </TableCell>
      <TableCell align={'right'}>
        <Typography
          variant="subtitle1"
          sx={{
            color:
              Number(item.current?.P) < 0
                ? COLOR.red
                : Number(item.current?.P) > 0
                ? COLOR.green
                : COLOR.yellow,

            '&.MuiTableCell-body': {
              padding: 0,
            },
          }}
        >
          {formatNumberWithTwoDecimals(item.current?.P)}%
        </Typography>
      </TableCell>
      <TableCell
        align={'right'}
        sx={{
          '&.MuiTableCell-body': {
            padding: 0,
          },
        }}
      >
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={1}
        >
          <img
            style={{
              height: '20px',
              width: '20px',
              color: '#000',
              fontWeight: 800,
            }}
            alt="123"
            src={imagePrice}
          />
          <Typography variant="subtitle1">{item.current?.v}</Typography>
        </Stack>
      </TableCell>
      <TableCell
        align={'right'}
        sx={{
          '&.MuiTableCell-body': {
            paddingRight: 2,
          },
        }}
      >
        <Typography variant="subtitle1">
          {formatNumberWithTwoDecimals(item.current?.q)}
        </Typography>
      </TableCell>
    </TableRow>
  );
};

export default ItemRow;
