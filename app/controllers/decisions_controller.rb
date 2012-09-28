class DecisionsController < ApplicationController

  def index
    # show all
    decisions = Decision.all

    render :json => decisions
  end

  def create
    # add to db
    puts params.inspect
    decision = Decision.new(params[:decision])
    decision.save

    render :json => params
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