import { Box, Typography, Rating } from "@mui/material";

interface ProductCardProps {
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  ratings: number;
  stock: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  imageUrl,
  description,
  price,
  ratings,
  stock,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 4,
        flexDirection: { xs: "column", md: "row" },
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        p: 3,
        mb: 4,
      }}
    >
      <Box sx={{ flex: 1 }}>
        <img
          src={imageUrl}
          alt={name}
          style={{
            width: "100%",
            maxHeight: 200,
            objectFit: "contain",
            borderRadius: 8,
          }}
        />
      </Box>
      <Box sx={{ flex: 2 }}>
        <Typography variant="h5" gutterBottom>
          {name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1, mb: 2 }}
        >
          {description}
        </Typography>
        <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
          <strong>Price:</strong> ${price.toFixed(2)}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          <strong>Stock:</strong> {stock} units
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <Typography sx={{ mr: 1 }}>
            <strong>Ratings:</strong>
          </Typography>
          <Rating name="read-only" value={ratings} precision={0.1} readOnly />
          <Typography variant="caption" sx={{ ml: 1 }}>
            ({ratings})
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default ProductCard;
