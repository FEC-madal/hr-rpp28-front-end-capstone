import React from "react";

const RelatedItemCard = (props) => (
  <div id="relatedItemCard">
    <br />
    These are the RelatedItemCards:
    <br />
    id:
    {props.data.id}
    <br />
    name:
    {props.data.name}
    <br />
    default_price:
    {props.data.default_price}
    <br />
  </div>
);

export default RelatedItemCard;