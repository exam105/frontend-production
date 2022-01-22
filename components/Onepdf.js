import {
  Document,
  Page,
  Text,
  StyleSheet,
  Font,
  View,
  Canvas,
} from "@react-pdf/renderer";
import { MathpixLoader, MathpixMarkdown } from "mathpix-markdown-it";

import Question from "./Question";
// Create styles
Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    textAlign: "center",
  },
  paper: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
    textAlign: "center",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: "Oswald",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  line: {
    display: "flex",
    flexDirection: "column",
    paddingBottom: 1,
    borderTopWidth: 2,
    borderTopStyle: "solid",
    borderTopColor: "black",
    borderBottomWidth: 2,
    borderBottomStyle: "solid",
    borderBottomColor: "black",
    borderLeftWidth: 3,
    borderLeftStyle: "solid",
    borderLeftColor: "lightgray",
    borderRightWidth: 3,
    borderRightStyle: "solid",
    borderRightColor: "lightgray",
  },
});

const Onepdf = () => {
  const obj = {
    questions: [
      {
        id: "61166a5c460de49768ee027b",
        question:
          "En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no hamucho tiempo que vivía un hidalgo de los de lanza en astillero, adargaantigua, rocín flaco y galgo corredor. Una olla de algo más vaca que carnero, salpicón las más noches, duelos y quebrantos los sábados, lentejas los viernes, algún palomino de añadidura los domingos, consumían las tres partes de su hacienda. For reference, see Fig-1.",
        marks: "12",
        answer:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem, tenetur aspernatur voluptate voluptatum sunt cupiditate! Necessitatibus quod deleniti recusandae officia. Amet, laudantium? Unde nostrum, fugit ipsum quas commodi repellendus doloribus.",
        topics: [{ topic: "Tech" }, { topic: "Math" }, { topic: "Sci" }],
        images: [
          {
            imageurl:
              "https://exam105.s3.ap-southeast-1.amazonaws.com/Math/igcse_edexcel_1_2012_paper1_ques_11.JPG",
          },
        ],
      },
      {
        id: "6116675c460de49768ee027b",
        question:
          "En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no hamucho tiempo que vivía un hidalgo de los de lanza en astillero, adargaantigua, rocín flaco y galgo corredor. Una olla de algo más vaca que carnero, salpicón las más noches, duelos y quebrantos los sábados, lentejas los viernes, algún palomino de añadidura los domingos, consumían las tres partes de su hacienda. For reference, see Fig-1.",
        marks: "10",
        answer:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem, tenetur aspernatur voluptate voluptatum sunt cupiditate! Necessitatibus quod deleniti recusandae officia. Amet, laudantium? Unde nostrum, fugit ipsum quas commodi repellendus doloribus.",
        topics: [
          { topic: "Global" },
          { topic: "Technopath" },
          { topic: "Scifi" },
        ],
        images: [
          {
            imageurl:
              "https://exam105.s3.ap-southeast-1.amazonaws.com/Math/igcse_edexcel_1_2012_paper1_ques_2_b_i.JPG",
          },
        ],
      },
      {
        id: "61546a5c460de49768ee027b",
        question:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem, tenetur aspernatur voluptate voluptatum sunt cupiditate! Necessitatibus quod deleniti recusandae officia. Amet, laudantium? Unde nostrum, fugit ipsum quas commodi repellendus doloribus.",
        marks: "20",
        answer:
          "En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no hamucho tiempo que vivía un hidalgo de los de lanza en astillero, adargaantigua, rocín flaco y galgo corredor. Una olla de algo más vaca que carnero, salpicón las más noches, duelos y quebrantos los sábados, lentejas los viernes, algún palomino de añadidura los domingos, consumían las tres partes de su hacienda. For reference, see Fig-1.",
        topics: [
          { topic: "Calc" },
          { topic: "Business" },
          { topic: "Exarcism" },
        ],
        images: [
          {
            imageurl:
              "https://exam105.s3.ap-southeast-1.amazonaws.com/Math/igcse_edexcel_1_2012_paper1_ques_11.JPG",
          },
          {
            imageurl:
              "https://exam105.s3.ap-southeast-1.amazonaws.com/Math/igcse_edexcel_1_2012_paper1_ques_2_b_i.JPG",
          },
        ],
      },
      {
        id: "61236a5c460de49768ee027b",
        question:
          "En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no hamucho tiempo que vivía un hidalgo de los de lanza en astillero, adargaantigua, rocín flaco y galgo corredor. Una olla de algo más vaca que carnero, salpicón las más noches, duelos y quebrantos los sábados, lentejas los viernes, algún palomino de añadidura los domingos, consumían las tres partes de su hacienda. For reference, see Fig-1.",
        marks: "30",
        answer:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem, tenetur aspernatur voluptate voluptatum sunt cupiditate! Necessitatibus quod deleniti recusandae officia. Amet, laudantium? Unde nostrum, fugit ipsum quas commodi repellendus doloribus.",
        topics: [
          { topic: "Teach" },
          { topic: "Dang" },
          { topic: "Wingardium" },
        ],
        images: [
          {
            imageurl: "/images/a.png",
          },
          {
            imageurl: "/images/b.png",
          },
        ],
      },
    ],
  };

  return (
    <Document>
      <Page style={styles.body}>
        <View style={styles.line}>
          <Text style={styles.paper}>
            IGCSE - Edexcel - Math - June 2011 - Series 4 - Paper 1
          </Text>
        </View>
        {obj.questions.map((question) => {
          return (
            <Question
              key={question.id}
              question={question.question}
              answer={question.answer}
              marks={question.marks}
              topics={question.topics}
              images={question.images}
            />
          );
        })}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};

export default Onepdf;
