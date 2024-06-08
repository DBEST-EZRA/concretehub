import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const Help = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const faqList = [
    {
      question: "What is the purpose of this concrete hub?",
      answer:
        "The purpose of this concrete hub is to provide a centralized platform for managing concrete-related tasks, including ordering, tracking, and managing concrete deliveries.",
    },
    {
      question: "How do I place an order for concrete?",
      answer:
        "To place an order for concrete, navigate to the 'Order' section of the app and follow the prompts to specify your requirements, including quantity, mix type, delivery date, and location.",
    },
    {
      question: "Can I track the status of my concrete order?",
      answer:
        "Yes, you can track the status of your concrete order in real-time through the 'Order Status' section of the app. You'll receive updates on the processing, dispatch, and delivery stages of your order.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept various payment methods, including credit/debit cards, online bank transfers, and cash on delivery. You can choose the most convenient option during the checkout process.",
    },
    {
      question: "Is there a minimum order quantity?",
      answer:
        "Yes, there is a minimum order quantity requirement for concrete orders. The specific minimum quantity may vary depending on your location and the type of concrete mix requested.",
    },
    {
      question: "How far in advance should I place my concrete order?",
      answer:
        "It's recommended to place your concrete order at least 24-48 hours in advance to ensure availability and scheduling. However, we also offer same-day and urgent delivery options in some areas.",
    },
    {
      question: "Can I cancel or modify my concrete order?",
      answer:
        "Yes, you can cancel or modify your concrete order, but it's subject to our cancellation and modification policy. Please contact customer support as soon as possible to discuss any changes to your order.",
    },
    {
      question: "Are there additional charges for delivery?",
      answer:
        "Delivery charges may apply based on the distance, quantity, and delivery time slot selected. The delivery fee will be calculated and displayed during the checkout process before you confirm your order.",
    },
    {
      question: "Do you offer discounts for bulk orders?",
      answer:
        "Yes, we offer discounts for bulk orders of concrete. The discount rate may vary depending on the order quantity and other factors. Please inquire with our sales team for more information.",
    },
    {
      question: "What types of concrete mixes are available?",
      answer:
        "We offer a variety of concrete mixes tailored to different applications, including standard mixes, high-strength mixes, decorative mixes, and specialty mixes for specific construction requirements.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can contact our customer support team via phone, email, or live chat. Visit the 'Contact Us' section of the app for our contact details and operating hours.",
    },
    {
      question: "Do you provide technical support or assistance?",
      answer:
        "Yes, we provide technical support and assistance for concrete-related queries, including mix design recommendations, troubleshooting, and guidance on best practices for handling and placing concrete.",
    },
    {
      question: "Is there a loyalty program for frequent customers?",
      answer:
        "Yes, we offer a loyalty program for frequent customers, where you can earn points for every purchase and redeem them for rewards, discounts, or exclusive offers. Join our loyalty program to start enjoying the benefits.",
    },
    {
      question: "What safety measures are in place for concrete delivery?",
      answer:
        "We adhere to strict safety protocols and guidelines during concrete delivery to ensure the safety of our customers, delivery personnel, and bystanders. This includes proper vehicle maintenance, driver training, and site safety procedures.",
    },
    {
      question: "Can I schedule a specific delivery time?",
      answer:
        "Yes, you can schedule a specific delivery time for your concrete order based on availability. During the checkout process, you'll have the option to select your preferred delivery date and time slot.",
    },
    {
      question: "Do you offer weekend or after-hours delivery?",
      answer:
        "Yes, we offer weekend and after-hours delivery options for customers who require concrete delivery outside of regular business hours. Additional charges may apply for deliveries during weekends or off-peak hours.",
    },
    {
      question: "What happens if my concrete order is delayed?",
      answer:
        "In the rare event of a delay in your concrete order, our customer support team will promptly notify you and provide updates on the revised delivery schedule. We strive to minimize any inconvenience caused by delays.",
    },
    {
      question: "Can I order concrete for residential projects?",
      answer:
        "Yes, we cater to both residential and commercial customers for their concrete needs. Whether you're a homeowner, contractor, or developer, you can rely on us for quality concrete products and services.",
    },
    {
      question:
        "Are there any restrictions on where concrete can be delivered?",
      answer:
        "There may be certain restrictions on concrete delivery locations due to accessibility, site conditions, or legal regulations. Please inform us of any specific requirements or constraints when placing your order.",
    },
    {
      question: "How can I provide feedback or suggestions?",
      answer:
        "We value your feedback and suggestions for improving our services. You can submit your feedback through the app's feedback form, or directly contact our customer support team. Your input helps us enhance the customer experience.",
    },
  ];

  const handleQuestionClick = (index) => {
    setSelectedQuestion(index === selectedQuestion ? null : index);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}>Help</Text>
        {faqList.map((faq, index) => (
          <View key={index}>
            <TouchableOpacity onPress={() => handleQuestionClick(index)}>
              <Text
                style={[
                  styles.question,
                  selectedQuestion === index && styles.selectedQuestion,
                ]}
              >
                {faq.question}
              </Text>
            </TouchableOpacity>
            {selectedQuestion === index && (
              <View style={styles.answerContainer}>
                <Text style={styles.answer}>{faq.answer}</Text>
              </View>
            )}
            <View style={styles.separator} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    marginBottom: 10,
    // color: "blue",
  },
  selectedQuestion: {
    fontWeight: "bold",
  },
  answerContainer: {
    backgroundColor: "rgba(173, 216, 230, 0.5)",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  answer: {
    fontSize: 16,
  },
  separator: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});

export default Help;
