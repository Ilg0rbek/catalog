import * as React from "react";
import { Button, Input, Select, Table } from "antd";
import { ButtonSize } from "../../../../../common/enum";
import { CustomUpload } from "../../../../common";
import styles from "./styles.module.css";
import dotenv from "dotenv";
import { SoundButton } from "../../../../common/hoc/sounds/tap-ui-sound";
import { useState } from "react";
dotenv.config();

const { Column } = Table;
const { Option } = Select;
export const ManageThemes = ({
  cards,
  cardsSizeTypes,
  isMobileScreen,
  defaultCardsSizeType,
  updateCardsDesignHandler,
  themeQuery
}) => {
  const [state, setState] = useState({
    rows: {},
  });

  const setCardSize = ({ sizeId, id }) => {
    setState((prevState) => ({
      ...prevState,
      rows: { ...state.rows, [id]: { ...state.rows[id], sizeId } },
    }));
  };

  const setImageClear = ({ id }) => {
    setState((prevState) => ({
      ...prevState,
      rows: { ...state.rows, [id]: { ...state.rows[id], isImageClear: true } },
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
    return updateCardsDesignHandler(id, data);
  };

  const serCardDescription = ({ value, id }) => {
    return setState((prevState) => ({
      ...prevState,
      rows: { ...state.rows, [id]: { ...state.rows[id], description: value } },
    }));
  };

  const setCardSortOrder = ({ id, value }) => {
    return setState((prevState) => ({
      ...prevState,
      rows: { ...state.rows, [id]: { ...state.rows[id], sort: value } },
    }));
  };

  const setImageBuilder = (id) => {
    return function setImage(image) {
      setState((prevState) => ({
        ...prevState,
        rows: { ...state.rows, [id]: { ...state.rows[id], image } },
      }));
    };
  };

  const columnsNames = {
    ID: { key: "id", title: "id", content: null },
    THEME_NAME: {
      key: "theme",
      title: "Тема",
      content: null,
    },
    FLOAT_TYPE: {
      key: "size",
      title: "Размер",
      content: (_, record) => {
        return (
          <Select
            defaultValue={record.size}
            style={{ width: 140 }}
            onChange={(sizeId) => setCardSize({ sizeId, id: record.id })}
          >
            {cardsSizeTypes.map((el) => {
              return (
                <Option key={el.id} value={el.id}>
                  {el.type}
                </Option>
              );
            })}
          </Select>
        );
      },
    },
    DESCRIPTION: {
      key: "description",
      title: "Описание",
      content: (_, record) => {
        return (
          <Input
            onChange={(event) =>
              serCardDescription({ value: event.target.value, id: record.id })
            }
            placeholder={record.description}
          />
        );
      },
    },
    IMAGE: {
      key: "image",
      title: "Картинка",
      content: (_, record) => {
        return (
          <div className={styles.customUploadWrapper}>
            <CustomUpload
              setFile={setImageBuilder(record.id)}
              defaultImage={record.image}
            />
            <Button
              size={ButtonSize.SMALL}
              onClick={() => setImageClear({ id: record.id })}
            >
              Очистить
            </Button>
            <p className={styles.tooltipText}>
              Изображение должно иметь отношение ширина : высота - 1 : 2
            </p>
          </div>
        );
      },
    },
    SORT: {
      key: "sort",
      title: "Порядок сортировки",
      content: (_, record) => {
        return (
            <Input
                onChange={(event) => setCardSortOrder({ value: event.target.value, id: record.id })}
                placeholder={record.sort}
            />
        );
      },
    },
    ACTION: {
      key: "actions",
      title: "Действия",
      content: (_, record) => {
        return (
          <SoundButton
            disabled={!!!state.rows[record.id]}
            onClick={() => {
              updateHandle(record.id, {
                themeId: record.id,
                sizeId: state.rows[record.id]
                  ? state.rows[record.id].sizeId
                  : record.size,
                description: state.rows[record.id]
                  ? state.rows[record.id].description
                  : record.description,
                image: state.rows[record.id]
                  ? state.rows[record.id].image
                  : null,
                sort: state.rows[record.id]
                    ? state.rows[record.id].sort
                    : 0,
                isImageClear: state.rows[record.id]
                  ? state.rows[record.id].isImageClear
                  : false,
              });
            }}
          >
            Подтвердить
          </SoundButton>
        );
      },
      fixed: "right",
      width: 150,
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

  let filteredCards = cards;
  if (themeQuery) {
    filteredCards = cards.filter((card) => {
      if (!card || !card.name) { return false }
      const rx = new RegExp(themeQuery, 'i');
      return card.name.match(rx) !== null;
    })
  }

  const data = filteredCards.map((card) => {
    return {
      [columnsNames.ID.key]: isMobileScreen
          ? `${columnsNames.ID.title}: ${card.id}`
          : card.id,
      [columnsNames.FLOAT_TYPE.key]: isMobileScreen
          ? `${columnsNames.FLOAT_TYPE.title}: ${
              !!card?.size?.type ? card.size.type : defaultCardsSizeType.type
          }`
          : !!card?.size?.type
              ? card.size.type
              : defaultCardsSizeType.type,
      [columnsNames.THEME_NAME.key]: isMobileScreen
          ? `${columnsNames.THEME_NAME.title}: ${card.name}`
          : card.name,
      [columnsNames.DESCRIPTION.key]: isMobileScreen
          ? `${columnsNames.DESCRIPTION.title}: ${
              card.description ? card.description : "Нет описания"
          }`
          : `${card.description ? card.description : "Нет описания"}`,
      [columnsNames.IMAGE.key]: card?.image?.name
          ? `${process.env.REACT_APP_API_URL_USER_STATIC}/${card.image.name}`
          : null,
      [columnsNames.SORT.key]: card?.sort
          ? card.sort
          : 0,
    }
  });
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
