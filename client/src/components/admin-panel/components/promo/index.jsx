import * as React from "react";
import { Button, Input, Table } from "antd";
import { ButtonSize } from "../../../../common/enum";
import { SoundButton } from "../../../common/hoc/sounds/tap-ui-sound";

const { Column } = Table;
export const Promo = ({ settings, setSettings, isMobileScreen }) => {

  const sett = {
  PROMO: settings.PROMO
  }
  
  const promocode = () => {
     let letters = [];
     const str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
     [...str].map((val) => {
     letters.push(val);
      }
    )
    const shuffled = letters.sort(() => Math.random() - 0.5)
    return shuffled.join('').substring(0, 8);
  }

  const [state, setState] = React.useState({});
  const handleValueChange = ({ value, id }) => {
    return setState((prevState) => ({
      ...prevState,
      [id]: { value, key: id },
    }));
  };
  const setSettingsHandle = (record) => {
    setSettings(state[record.key]);
    setState((prevState) => ({
      ...prevState,
      [record.key]: { ...state[record.key], value: state[record.key].value },
    }));
  };
  const columnsNames = {
    KEY: { key: "key", title: "", content: null },
    VALUE: {
      key: "value",
      title: "Значение",
      content: (_, record) => {
        return (
          <Input 
            value={state[record.key]?.value ? state[record.key].value : record.value}
          />
        );
      },
    },
    ACTION: {
      key: "actions",
      title: "",
      content: (_, record) => (
        <SoundButton
          onClick={() => {
            handleValueChange({ value: promocode(), id: record.key })
          }}
        >
          Сгенерировать
        </SoundButton>
      ),
    },

    SAVE_BUTTON: {
      key: "save_buttons",
      title: "",
      content: (_, record) => (
        <SoundButton
          onClick={() => {
             setSettingsHandle(record);
          }}
        >
          Сохранить
        </SoundButton>
      ),
    },
  };
  const renderColumns = () => {
    return Object.values(columnsNames).map((value) => {
      if (value.content) {
        return (
          <Column title={value.title} key={value.key} render={value.content} />
        );
      }
      return (
        <Column title={value.title} key={value.key} dataIndex={value.key} />
      );
    });
  };
  const data = Object.keys(sett).map((property) => ({
    [columnsNames.KEY.key]: property,
    [columnsNames.VALUE.key]: sett[property].value,
  }));

  if(!state[data[0].key]){
    state[data[0].key] = {
      key: data[0].key,
      value: data[0].value
    } 
  }
  
  return (
    <Table
      dataSource={data}
      size={isMobileScreen ? ButtonSize.SMALL : ButtonSize.MIDDLE}
      rowKey={(record) => record.id}
    >
      {renderColumns()}
    </Table>
  );
};
