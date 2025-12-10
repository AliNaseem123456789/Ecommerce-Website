import React from "react";

const RefundReturns = () => {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        lineHeight: 1.6,
      }}
    >
      {/* Heading */}
      <h1
        style={{
          textAlign: "center",
          fontSize: "2rem",
          marginBottom: "30px",
        }}
      >
        Refund and Returns Policy
      </h1>

      {/* Content */}
      {/* <p>
        This is a sample page.
      </p> */}

      <h2>Overview</h2>
      <p>
        Our refund and returns policy lasts 30 days. If 30 days have passed
        since your purchase, we can’t offer you a full refund or exchange.
      </p>
      <p>
        To be eligible for a return, your item must be unused and in the same
        condition that you received it. It must also be in the original
        packaging.
      </p>
      <p>
        Several types of goods are exempt from being returned. Perishable goods
        such as food, flowers, newspapers or magazines cannot be returned. We
        also do not accept products that are intimate or sanitary goods,
        hazardous materials, or flammable liquids or gases.
      </p>

      <h3>Additional non-returnable items:</h3>
      <ul>
        <li>Gift cards</li>
        <li>Downloadable software products</li>
        <li>Some health and personal care items</li>
      </ul>

      <p>To complete your return, we require a receipt or proof of purchase.</p>
      <p>Please do not send your purchase back to the manufacturer.</p>

      <h3>Partial Refunds</h3>
      <p>
        There are certain situations where only partial refunds are granted:
      </p>
      <ul>
        <li>Book with obvious signs of use</li>
        <li>
          CD, DVD, VHS tape, software, video game, cassette tape, or vinyl
          record that has been opened.
        </li>
        <li>
          Any item not in its original condition, is damaged or missing parts
          for reasons not due to our error.
        </li>
        <li>Any item that is returned more than 30 days after delivery</li>
      </ul>

      <h2>Refunds</h2>
      <p>
        Once your return is received and inspected, we will send you an email
        to notify you that we have received your returned item. We will also
        notify you of the approval or rejection of your refund.
      </p>
      <p>
        If you are approved, your refund will be processed, and a credit will
        automatically be applied to your original method of payment within a
        certain number of days.
      </p>

      <h3>Late or missing refunds</h3>
      <p>
        If you haven’t received a refund yet, first check your bank account
        again, then contact your credit card company, and finally your bank. If
        you still have not received your refund, contact us at {`{email address}`}.
      </p>

      <h3>Sale items</h3>
      <p>Only regular priced items may be refunded. Sale items cannot be refunded.</p>

      <h3>Exchanges</h3>
      <p>
        We only replace items if they are defective or damaged. To exchange, email us at {`{email address}`} and send your item to: {`{physical address}`}.
      </p>

      <h3>Gifts</h3>
      <p>
        If the item was marked as a gift when purchased and shipped directly to
        you, you’ll receive a gift credit for the value of your return.
      </p>

      <h3>Shipping returns</h3>
      <p>
        You will be responsible for paying your own shipping costs for returning
        your item. Shipping costs are non-refundable. Consider using a trackable
        shipping service for expensive items.
      </p>

      <h3>Need help?</h3>
      <p>Contact us at {`{email}`} for questions related to refunds and returns.</p>
    </div>
  );
};

export default RefundReturns;
