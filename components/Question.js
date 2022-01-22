import {
  Document,
  Text,
  StyleSheet,
  Font,
  Image,
  View,
} from "@react-pdf/renderer";
import { MathpixLoader, MathpixMarkdown } from "mathpix-markdown-it";
import TextImage from "./TextImage";

// Create styles
Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Oswald",
  },
  heading: {
    fontSize: 18,
    fontFamily: "Oswald",
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
    width: 200,
    height: "auto",
    marginLeft: 5,
  },
  imageWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  caption: {
    paddingLeft: "50%",
  },
  marks: {
    paddingLeft: "80%",
    fontSize: 14,
    fontFamily: "Times-Roman",
  },
  topic: {
    fontSize: 14,
    fontFamily: "Times-Roman",
    display: "flex",
    flexDirection: "row",
  },
});

const Question = ({ question, answer, marks, topics, images }) => {
  /* "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" */
  const obj = {
    quesstion: "blah blah blah",
  };
  return (
    <Document>
      <Text> </Text>
      <View>
        {/* <Image alt="Error" style={styles.image} src={TextImage} /> */}
        {/* <MathpixLoader>
              <MathpixMarkdown text={obj.quesstion} />
            </MathpixLoader> */}
        <div>blah</div>
      </View>
      <Text>Topics:</Text>
      <View style={styles.topic}>
        {topics.map((item, i) => {
          return (
            <View key={i} style={styles.topic}>
              <Text style={styles.topic}>{item.topic}</Text>
              <Text style={styles.topic}>
                {topics.length > 1 && i !== topics.length - 1 ? ", " : ""}
              </Text>
            </View>
          );
        })}
      </View>
      <Text style={styles.heading}>Question:</Text>
      <Text style={styles.marks}>Marks: {marks}</Text>
      <Text style={styles.text}>{question}</Text>
      <View style={styles.imageWrapper}>
        {images.map((item, i) => {
          if (item.imageurl) {
            return (
              <Image
                key={i}
                alt="Error"
                style={styles.image}
                src={item.imageurl}
              />
            );
          }
        })}
      </View>

      <Text style={styles.heading}>Answer:</Text>
      <Text style={styles.text}>{answer}</Text>
      <Text style={styles.title}>------------------------------------</Text>
      <Text> </Text>
    </Document>
  );
};

export default Question;
