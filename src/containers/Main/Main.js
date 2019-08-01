import React, { Component } from "react";
import * as _ from "lodash";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
class Main extends Component {
  state = {
    //Для данной задачи нужно только два стейта
    items: null,
    loading: true,
  };
  // Lifecycle hook который вызывается сразу после инициализации и рендеринга
  componentDidMount() {
    //Переменная содержащая ссылку на api
    const url =
      "https://api.stackexchange.com/2.2/search?intitle=react&site=stackoverflow";
    //GET(по дефолту)-запрос
    fetch(url)
      //Получаем данные с API
      .then(response => response.json())
      //Обрабатываю данные
      .then(data => {
        //Решил изменять стейт к нужному, а не хранить в нём все данные и манипулировать другими переменными а не стейтом
        //Переменная items для того чтобы хранить нужный стейт и небыло ошибки с постоянным изменением стейта, что создаёт вечный цикл компонента
        let items = [];
        //Ищу нужные посты по критериям
        data.items.map((res, index) => {
          if (res.is_answered === true && res.owner.reputation >= 50) {
            //Добавляю каждый подходящий в итоговый массив
            items.push(data.items[index]);
          }
          //Мне нужен этот метод только для того чтобы заполнить массив, поэтому возвращаю NULL
          return null;
        });
        //Задаю правильный стейт с только необходимой информацией
        //Задаю стейту loading:false чтобы спинер пропал
        this.setState({ items: items, loading: false });
      });
  }
  //Метод для кнопки убывания
  descending = () => {
    //Сортирую с помощью lodash по убыванию
    const items = _.orderBy(this.state.items, ["creation_date"], ["desc"]);
    this.setState({ items: items });
  };
  //Метод для кнопки возрастания
  ascending = () => {
    //Сортирую с помощью lodash по возрастанию
    const items = _.orderBy(this.state.items, ["creation_date"], ["asc"]);
    this.setState({ items: items });
  };
  render() {
    return (
      <div>
        {/* Вывожу спинер при условии что стейт загрузки возвращает правду */}
        {this.state.loading === true ? (
          <Spinner />
        ) : (
          // В противном случае у меня должны показываться кнопки
          <Button descending={this.descending} ascending={this.ascending} />
        )}
        {/* Вывожу сами посты только если они уже хранятся в стейте */}
        {this.state.items
          ? //Прохожу через стейт и возвращаю каждый подходящий пост с необходимой версткой
            this.state.items.map(res => {
              return (
                //Весь контейнер долже был быть ссылкой
                //key prop делает каждый элемент уникальным
                //Делаю так чтобы цвет текста был не синим с помощью style
                <a
                  className=" box has-text-centered"
                  key={res.question_id}
                  href={res.link}
                  style={{
                    color: "#000000",
                    textDecoration: "none",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                >
                  {/* Я использую фреймворк Bulma, который мне очень полюбился потому что он мало весит
                    и идёт без JS в отличии от Bootstrap, но флекс сетку я тоже знаю */}
                  <article
                    style={{
                      height: "100%",
                      marginBottom: "10px",
                    }}
                    className="media"
                  >
                    {/* Распределяю контент внутри Media контейнера как сказано в задании */}
                    {/* Media component - это компонент с чёткой структурой, для которого нужно использовать только определённые классы фреймворка */}
                    <figure className="media-left">
                      <p className="image is-32x32">
                        <img
                          // Вставляю как параметр путь к фото пользователя
                          src={res.owner.profile_image}
                          alt="https://bulma.io/images/placeholders/32x32.png"
                        />
                      </p>
                    </figure>
                    {/* Вставляю заголовок вопроса */}
                    <h1>{res.title}</h1>
                    <p
                      style={{
                        height: "40px",
                      }}
                    />
                  </article>
                </a>
              );
            })
          : null}
      </div>
    );
  }
}

export default Main;
