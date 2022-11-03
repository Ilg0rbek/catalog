import * as React from "react";
import { Button, Table, Space, Input, DatePicker } from "antd";
import { userRoles } from "../../../../../common/enum/user";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { ButtonSize } from "../../../../../common/enum";
import {
  convertDateToMoment,
  convertMomentToDate,
  dateDifferent,
} from "../../../../../helpers";
import { SoundButton } from "../../../../common/hoc/sounds/tap-ui-sound";

const { Column } = Table;
export const UpdateUser = ({ users, update, banUser, isMobileScreen }) => {
  const [state, setState] = React.useState({
    rows: {},
  });
  const handleActivatedChange = ({ value, id }) => {
    return setState((prevState) => ({
      ...prevState,
      rows: { ...state.rows, [id]: { ...state.rows[id], activated: value } },
    }));
  };
  const handleApprovedChange = ({ value, id }) => {
    return setState((prevState) => ({
      ...prevState,
      rows: { ...state.rows, [id]: { ...state.rows[id], isApproved: value } },
    }));
  };
  const handleBonuseChange = ({ value, id }) => {
    return setState((prevState) => ({
      ...prevState,
      rows: { ...state.rows, [id]: { ...state.rows[id], bonuses: value } },
    }));
  };
  const handlePasswordChange = ({ value, id }) => {
    return setState((prevState) => ({
      ...prevState,
      rows: { ...state.rows, [id]: { ...state.rows[id], password: value } },
    }));
  };
  const handleApproveExpireChange = ({ value, id }) => {
    return setState((prevState) => ({
      ...prevState,
      rows: {
        ...state.rows,
        [id]: { ...state.rows[id], approveExpire: value },
      },
    }));
  };
  const updateHandle = (id, data) => {
    setState((prevState) => ({
      ...prevState,
      rows: {
        ...prevState.rows,
        [id]: null,
      },
    }));
    return update(id, data);
  };
  const columnsNames = {
    ID: { key: "id", title: "id", content: null },
    EMAIL: { key: "email", title: "Email" },
    REGISTRATION_DATE: {
      key: "createdAt",
      title: "Дата регистрации",
      content: null,
    },
    ACTIVATED: {
      key: "activated",
      title: "Активирован email",
      content: (_, record) => (
        <Checkbox
          onChange={(event) =>
            handleActivatedChange({
              value: event.target.checked,
              id: record.id,
            })
          }
          defaultChecked={record.activated}
        />
      ),
    },
    APPROVE: {
      key: "isApproved",
      title: "Подписка оформлена",
      content: (_, record) => (
        <Checkbox
          onChange={(event) =>
            handleApprovedChange({ value: event.target.checked, id: record.id })
          }
          defaultChecked={record.isApproved}
        />
      ),
    },
    BONUSES: { 
     key: "bonuses", 
     title: "Бонусы",
     content: (_, record) => {
        return (
          <Input
            value={state.rows[record.id]?.bonuses ? state.rows[record.id]?.bonuses : record.bonuses}
            onChange={(event) =>{
             console.log(state); 
             handleBonuseChange({ value: event.target.value, id: record.id })
             }
             }
          />
        );
      },
    },
    APPROVE_EXPIRE: {
      key: "approveExpireInput",
      title: "До истечения подписки",
    },
    APPROVE_EXPIRE_INPUT: {
      key: "approveExpire",
      title: "Изменить срок подписки",
      content: (_, record) => {
        return (
          <DatePicker
            onChange={(moment) => {
              console.log(convertDateToMoment(record.approveExpire));
              console.log(convertDateToMoment(record.approveExpire).toString());
              console.log(convertMomentToDate(moment));
              console.log(record.approveExpire);
              handleApproveExpireChange({
                value: convertMomentToDate(moment),
                id: record.id,
              });
            }}
            defaultValue={convertDateToMoment(record.approveExpire)}
            disabled={!record.isApproved}
          />
        );
      },
    },
    PASSWORD: {
      key: "password",
      title: "Пароль",
      content: (_, record) => {
        return (
          <Input.Password
            value={state?.password}
            onChange={(event) =>
              handlePasswordChange({ value: event.target.value, id: record.id })
            }
            placeholder={"новый пароль"}
          />
        );
      },
    },
    ACTION: {
      key: "actions",
      title: "Действия",
      content: (_, record) => (
        <Space>
          <SoundButton
            disabled={!!!state.rows[record.id]}
            onClick={() => {
              updateHandle(record.id, { ...record, ...state.rows[record.id] });
            }}
          >
            Сохранить
          </SoundButton>
          <SoundButton
            onClick={() => {
              banUser(record.id, true);
            }}
            danger
          >
            Заблокировать
          </SoundButton>
        </Space>
      ),
      fixed: "right",
      width: 250,
    },
  };
  const renderColumns = () => {
    return Object.values(columnsNames).map((value) => {
      if (value.content) {
        return (
          <Column
            title={value.title}
            key={value.key}
            render={value.content}
            fixed={value.fixed}
            width={value.width}
          />
        );
      }
      return (
        <Column
          title={value.title}
          key={value.key}
          dataIndex={value.key}
          fixed={value.fixed}
          width={value.width}
        />
      );
    });
  };

  const data = users
    .filter((user) => user.role == userRoles.USER && user.isBanned === false)
    .map((user) => ({
      [columnsNames.ID.key]: isMobileScreen
        ? `${columnsNames.ID.title}: ${user.id}`
        : user.id,
       [columnsNames.BONUSES.key]: isMobileScreen
        ? `${columnsNames.BONUSES.title}: ${user.bonuses}`
        : user.bonuses,

      [columnsNames.EMAIL.key]: isMobileScreen
        ? `${columnsNames.EMAIL.title}: ${user.email}`
        : user.email,
      [columnsNames.REGISTRATION_DATE.key]: isMobileScreen
        ? `${columnsNames.REGISTRATION_DATE.title}: ${user.createdAt}`
        : user.createdAt,
      [columnsNames.APPROVE_EXPIRE.key]: isMobileScreen
        ? `${columnsNames.APPROVE_EXPIRE.title}: ${
            user.isApproved
              ? user.approveExpire
                ? dateDifferent({
                    date1: new Date(user.approveExpire),
                    date2: Date.now(),
                  })
                : "Не определенно"
              : "Подписка отсутствует"
          }`
        : `${
            user.isApproved
              ? user.approveExpire
                ? dateDifferent({
                    date1: new Date(user.approveExpire),
                    date2: Date.now(),
                  })
                : "Не определенно"
              : "Подписка отсутствует"
          }`,
      [columnsNames.APPROVE_EXPIRE_INPUT.key]: user.approveExpire
        ? user.approveExpire
        : Date.now(),
      [columnsNames.APPROVE.key]: isMobileScreen
        ? `${columnsNames.APPROVE.title}: ${user.isApproved}`
        : user.isApproved,
      [columnsNames.ACTIVATED.key]: isMobileScreen
        ? `${columnsNames.ACTIVATED.title}: ${user.activated}`
        : user.activated,
    }));

  return (
    <Table
      dataSource={data}
      size={isMobileScreen ? ButtonSize.SMALL : ButtonSize.MIDDLE}
      rowKey={(record) => record.id}
      scroll={!isMobileScreen ? { x: 1500 } : {}}
    >
      {renderColumns()}
    </Table>
  );
};
