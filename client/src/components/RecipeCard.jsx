const RecipeCard = ({ recipe, onToggleFavorite, onCardClick }) => {
  return (
    <article className="recipe-card" onClick={onCardClick}>
      <div className="card-media">
        <img src={recipe.image || '/images/recipe-placeholder.svg'} alt={recipe.title || 'Recipe'} />
        <button
          className={`fav-icon ${recipe.isFavorite ? 'active' : ''}`}
          type="button"
          aria-label="Favorite recipe"
          onClick={(event) => {
            event.stopPropagation();
            onToggleFavorite(recipe.id);
          }}
        >
          <i className={recipe.isFavorite ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}></i>
        </button>
      </div>
      <div className="card-body">
        <h3>{recipe.title}</h3>
        <p>{recipe.description || 'A delicious recipe shared by the community.'}</p>
        <div className="rating-stars">
          <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-regular fa-star"></i>
        </div>
      </div>
    </article>
  );
};

export default RecipeCard;
