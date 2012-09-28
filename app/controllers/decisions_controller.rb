class DecisionsController < ApplicationController

  def index
    # show all
    decisions = Decision.all

    render :json => decisions
  end

  def create
    # add to db
    #decision = params[:decision]
  end

  def new
    # show create view
  end

  def edit
    # show edit view
  end

  def show
    # show indiv decision
  end

  def update
    # save new stuff
  end

  def destroy
    # remove
  end

end