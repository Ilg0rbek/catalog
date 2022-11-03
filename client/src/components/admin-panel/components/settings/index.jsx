import * as React from "react";
import { Button, Input, Table } from "antd";
import { ButtonSize } from "../../../../common/enum";
import { SoundButton } from "../../../common/hoc/sounds/tap-ui-sound";

const { Column } = Table;
export const SettingsAdmin = ({ settings, setSettings, isMobileScreen }) => {
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
      [record.key]: { ...state[record.key], value: "" },
    }));
  };
  const columnsNames = {
    KEY: { key: "key", title: "Ключ", content: null },
    VALUE: {
      key: "value",
      title: "Значение",
      content: (_, record) => {
        return (
          <Input
            value={state[record.key]?.value}
            placeholder={record.value}
            onChange={(event) =>
              handleValueChange({ value: event.target.value, id: record.key })
            }
          />
        );
      },
    },
    DESCRIPTION: {
      key: "description",
      title: "Описание",
      content: null,
    },
    ACTION: {
      key: "actions",
      title: "Действия",
      content: (_, record) => (
        <SoundButton
          disabled={
            !(record.key in state) || !(state[record.key]?.value !== "")
          }
          onClick={() => {
            setSettingsHandle(record);
          }}
        >
          Обновить
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
  const data = Object.keys(settings).map((property) => ({
    [columnsNames.KEY.key]: isMobileScreen
      ? `${columnsNames.KEY.title}: ${property}`
      : property,
    [columnsNames.VALUE.key]: isMobileScreen
      ? `${columnsNames.VALUE.title}: ${settings[property].value}`
      : settings[property].value,
    [columnsNames.DESCRIPTION.key]: isMobileScreen
      ? `${columnsNames.DESCRIPTION.title}: ${settings[property].description}`
      : settings[property].description,
  }));
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
